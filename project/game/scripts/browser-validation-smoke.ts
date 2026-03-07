import { spawn, type ChildProcess } from 'node:child_process';
import { appendFile, writeFile } from 'node:fs/promises';
import {
  assertLoopbackSocketsAvailable,
  getBrowserValidationBlockingIssues,
  runBrowserValidationPreflight,
} from './browser-validation-support.ts';

const SERVER_PORT = 4173;
const DEBUG_PORT = 9222;
const SERVER_URL = `http://127.0.0.1:${SERVER_PORT}`;
const USER_DATA_DIR = '/tmp/survive-60-browser-smoke';
const RESULT_PATH = '/tmp/browser-validation-smoke.json';
const LOG_PATH = '/tmp/browser-validation-smoke.log';
const VALIDATION_REPORT_STORAGE_KEY = 'survive-60-seconds-last-validation-report-v1';
const SESSION_TELEMETRY_STORAGE_KEY = 'survive-60-seconds-session-telemetry-v1';
const INJECTED_RUNS = [12.4, 15.2, 9.8, 11.1, 16.4];

type RemoteObjectResult<T> = {
  result?: {
    value?: T;
    description?: string;
  };
  exceptionDetails?: unknown;
};

type SmokeResult = {
  injectedRuns: number[];
  validationReport: string;
  lastExportSummary: string;
  telemetryText: string;
  sessionRuns: number;
  sessionFirstDeath: number | null;
  reloadedSummary: string;
};

class CdpClient {
  private readonly socket: WebSocket;
  private nextId = 1;
  private readonly pending = new Map<
    number,
    {
      resolve: (value: unknown) => void;
      reject: (reason?: unknown) => void;
    }
  >();

  private constructor(socket: WebSocket) {
    this.socket = socket;
    this.socket.addEventListener('message', (event) => {
      const payload = JSON.parse(String(event.data)) as {
        id?: number;
        result?: unknown;
        error?: unknown;
      };

      if (!payload.id) {
        return;
      }

      const pending = this.pending.get(payload.id);

      if (!pending) {
        return;
      }

      this.pending.delete(payload.id);

      if (payload.error) {
        pending.reject(payload.error);
        return;
      }

      pending.resolve(payload.result);
    });
  }

  static async connect(webSocketUrl: string): Promise<CdpClient> {
    const socket = new WebSocket(webSocketUrl);

    await new Promise<void>((resolve, reject) => {
      socket.addEventListener('open', () => resolve(), { once: true });
      socket.addEventListener('error', (error) => reject(error), { once: true });
    });

    return new CdpClient(socket);
  }

  async send<T>(method: string, params?: Record<string, unknown>): Promise<T> {
    const id = this.nextId;
    this.nextId += 1;

    const response = new Promise<T>((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
    });

    this.socket.send(JSON.stringify({ id, method, params }));
    return response;
  }

  close(): void {
    this.socket.close();
  }
}

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const logStep = async (message: string): Promise<void> => {
  await appendFile(LOG_PATH, `${new Date().toISOString()} ${message}\n`);
};

const waitForHttp = async (url: string, timeoutMs: number): Promise<void> => {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url);

      if (response.ok) {
        return;
      }
    } catch {
      // Retry until timeout.
    }

    await delay(100);
  }

  throw new Error(`Timed out waiting for ${url}.`);
};

const waitForProcessExit = async (process: ChildProcess): Promise<void> =>
  new Promise((resolve) => {
    process.once('exit', () => resolve());
  });

const startStaticServer = (): ChildProcess =>
  spawn('python3', ['-m', 'http.server', String(SERVER_PORT), '-d', 'dist'], {
    cwd: process.cwd(),
    stdio: 'ignore',
  });

const startChromium = (): ChildProcess =>
  spawn(
    '/usr/bin/chromium',
    [
      '--headless=new',
      '--disable-gpu',
      '--no-first-run',
      '--no-default-browser-check',
      '--no-sandbox',
      `--remote-debugging-port=${DEBUG_PORT}`,
      `--user-data-dir=${USER_DATA_DIR}`,
      'about:blank',
    ],
    {
      cwd: process.cwd(),
      stdio: 'ignore',
    },
  );

const waitForTarget = async (): Promise<string> => {
  const startedAt = Date.now();

  while (Date.now() - startedAt < 10_000) {
    try {
      const response = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/version`);

      if (!response.ok) {
        throw new Error(`CDP version endpoint returned ${response.status}.`);
      }

      const payload = (await response.json()) as { webSocketDebuggerUrl?: string };

      if (payload.webSocketDebuggerUrl) {
        return payload.webSocketDebuggerUrl;
      }
    } catch {
      // Retry until timeout.
    }

    await delay(100);
  }

  throw new Error('Timed out waiting for Chromium remote debugging endpoint.');
};

const evaluate = async <T>(client: CdpClient, expression: string): Promise<T> => {
  const payload = await client.send<RemoteObjectResult<T>>('Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });

  if (payload.exceptionDetails) {
    throw new Error(`Runtime.evaluate failed for expression: ${expression}`);
  }

  return payload.result?.value as T;
};

const dispatchKey = async (client: CdpClient, key: string, code: string): Promise<void> => {
  await client.send('Input.dispatchKeyEvent', {
    type: 'keyDown',
    key,
    code,
    windowsVirtualKeyCode: key.toUpperCase().charCodeAt(0),
    nativeVirtualKeyCode: key.toUpperCase().charCodeAt(0),
  });
  await client.send('Input.dispatchKeyEvent', {
    type: 'keyUp',
    key,
    code,
    windowsVirtualKeyCode: key.toUpperCase().charCodeAt(0),
    nativeVirtualKeyCode: key.toUpperCase().charCodeAt(0),
  });
};

const waitForGameScene = async (client: CdpClient): Promise<void> => {
  const startedAt = Date.now();

  while (Date.now() - startedAt < 10_000) {
    const ready = await evaluate<boolean>(
      client,
      `Boolean(window.__SURVIVE_60_GAME__?.scene?.getScene('GameScene'))`,
    );

    if (ready) {
      return;
    }

    await delay(100);
  }

  throw new Error('GameScene did not become available.');
};

const injectSampleRuns = async (client: CdpClient): Promise<void> => {
  await evaluate(
    client,
    `(() => {
      const scene = window.__SURVIVE_60_GAME__?.scene?.getScene('GameScene');
      if (!scene) {
        throw new Error('GameScene missing.');
      }

      const runs = ${JSON.stringify(INJECTED_RUNS)};
      for (const seconds of runs) {
        scene.recordRunStart();
        scene.survivalTime = seconds;
        scene.runSpawnRerolls = 0;
        scene.recordRunEnd();
      }
    })()`,
  );
};

const readSmokeResult = async (client: CdpClient): Promise<SmokeResult> =>
  evaluate<SmokeResult>(
    client,
    `(() => {
      const scene = window.__SURVIVE_60_GAME__?.scene?.getScene('GameScene');
      if (!scene) {
        throw new Error('GameScene missing.');
      }

      return {
        injectedRuns: ${JSON.stringify(INJECTED_RUNS)},
        validationReport: window.localStorage.getItem('${VALIDATION_REPORT_STORAGE_KEY}') ?? '',
        lastExportSummary: scene.getLastValidationReportSummaryText(),
        telemetryText: scene.telemetryText.text,
        sessionRuns: scene.sessionTelemetry.totalRuns,
        sessionFirstDeath: scene.sessionTelemetry.firstDeathTime,
        reloadedSummary: '',
      };
    })()`,
  );

const main = async (): Promise<void> => {
  const keepAlive = setInterval(() => {
    // Keep Node alive while CDP and child-process promises are pending.
  }, 1_000);
  let server: ChildProcess | null = null;
  let chromium: ChildProcess | null = null;
  let client: CdpClient | null = null;

  try {
    await writeFile(LOG_PATH, '');
    await logStep('started');
    const preflight = await runBrowserValidationPreflight();
    const blockingIssues = getBrowserValidationBlockingIssues(preflight);

    if (blockingIssues.length > 0) {
      throw new Error(`Browser validation preflight failed: ${blockingIssues.join(' | ')}`);
    }

    await assertLoopbackSocketsAvailable();
    await logStep('browser_preflight_ok');
    server = startStaticServer();
    chromium = startChromium();
    server.once('exit', (code, signal) => {
      void logStep(`server_exit code=${code} signal=${signal}`);
    });
    chromium.once('exit', (code, signal) => {
      void logStep(`chromium_exit code=${code} signal=${signal}`);
    });

    await waitForHttp(SERVER_URL, 10_000);
    await logStep('server_ready');
    const webSocketUrl = await waitForTarget();
    await logStep('cdp_ready');
    client = await CdpClient.connect(webSocketUrl);
    await logStep('cdp_connected');

    await client.send('Page.enable');
    await client.send('Runtime.enable');
    await client.send('Page.navigate', { url: SERVER_URL });
    await waitForGameScene(client);
    await logStep('game_scene_ready');

    await evaluate(client, 'document.body.focus()');
    await dispatchKey(client, 'r', 'KeyR');
    await logStep('telemetry_reset_dispatched');

    const resetRuns = await evaluate<number>(
      client,
      `window.__SURVIVE_60_GAME__?.scene?.getScene('GameScene')?.sessionTelemetry?.totalRuns ?? -1`,
    );

    if (resetRuns !== 0) {
      throw new Error(`Telemetry reset failed. Expected 0 session runs, got ${resetRuns}.`);
    }

    await injectSampleRuns(client);
    await logStep('sample_runs_injected');
    await dispatchKey(client, 'v', 'KeyV');
    await logStep('validation_export_dispatched');

    await delay(150);

    const sessionStorageSnapshot = await evaluate<string | null>(
      client,
      `window.sessionStorage.getItem('${SESSION_TELEMETRY_STORAGE_KEY}')`,
    );

    if (!sessionStorageSnapshot) {
      throw new Error('Injected session telemetry was not persisted.');
    }

    const smokeResult = await readSmokeResult(client);
    await logStep('smoke_result_read');

    if (!smokeResult.validationReport.includes('validation_sample')) {
      throw new Error('Validation export was not saved to localStorage.');
    }

    if (!smokeResult.lastExportSummary.includes('5 runs')) {
      throw new Error('Last export summary did not become visible in-scene.');
    }

    await client.send('Page.reload', { ignoreCache: true });
    await waitForGameScene(client);
    await logStep('page_reloaded');

    const reloadedSummary = await evaluate<string>(
      client,
      `window.__SURVIVE_60_GAME__?.scene?.getScene('GameScene')?.getLastValidationReportSummaryText() ?? 'missing'`,
    );

    if (reloadedSummary !== smokeResult.lastExportSummary) {
      throw new Error(
        `Reloaded summary mismatch. Before reload: "${smokeResult.lastExportSummary}", after reload: "${reloadedSummary}".`,
      );
    }

    smokeResult.reloadedSummary = reloadedSummary;
    const serializedResult = JSON.stringify(smokeResult, null, 2);
    await writeFile(RESULT_PATH, serializedResult);
    await logStep('result_written');
    process.stdout.write(`${serializedResult}\n`);
  } finally {
    clearInterval(keepAlive);
    client?.close();
    server?.kill('SIGTERM');
    chromium?.kill('SIGTERM');
    await Promise.allSettled(
      [server, chromium].filter((process): process is ChildProcess => process !== null).map(waitForProcessExit),
    );
  }
};

const moduleKeepAlive = setInterval(() => {
  // Keep the process alive until the script resolves or fails.
}, 1_000);

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(() => {
    clearInterval(moduleKeepAlive);
  });

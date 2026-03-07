import { spawn } from 'node:child_process';
import { createValidationSnapshotReport } from './validation-snapshot.ts';
import {
  getBrowserValidationBlockingIssues,
  runBrowserValidationPreflight,
  type BrowserValidationPreflight,
} from './browser-validation-support.ts';

type CommandSuccess = {
  ok: true;
  command: string[];
  stdout: string;
};

type CommandFailure = {
  ok: false;
  command: string[];
  stdout: string;
  stderr: string;
  exitCode: number | null;
};

type CommandResult = CommandSuccess | CommandFailure;

type ValidationReadyStatus = 'ready' | 'blocked' | 'smoke-passed' | 'smoke-failed' | 'guard-failed';

const nodeArgs = ['--experimental-strip-types', '--experimental-specifier-resolution=node'];

const runNodeScript = async (scriptPath: string): Promise<CommandResult> =>
  new Promise((resolve) => {
    const command = ['node', ...nodeArgs, scriptPath];
    const child = spawn(command[0], command.slice(1), {
      cwd: process.cwd(),
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (chunk) => {
      stdout += String(chunk);
    });

    child.stderr.on('data', (chunk) => {
      stderr += String(chunk);
    });

    child.once('close', (exitCode) => {
      if (exitCode === 0) {
        resolve({
          ok: true,
          command,
          stdout: stdout.trim(),
        });
        return;
      }

      resolve({
        ok: false,
        command,
        stdout: stdout.trim(),
        stderr: stderr.trim(),
        exitCode,
      });
    });
  });

const summarizeGuardFailure = (guardResult: CommandFailure): string =>
  guardResult.stderr || guardResult.stdout || 'telemetry:check failed without output.';

const buildNextAction = (
  status: ValidationReadyStatus,
  preflight: BrowserValidationPreflight,
  smokeRequested: boolean,
): string => {
  if (status === 'guard-failed') {
    return 'Fix deterministic telemetry guard drift before attempting browser validation.';
  }

  if (!preflight.loopbackSocketsAvailable) {
    return `This agent runtime cannot bind ${preflight.socketProbeHost}. Verify the same probe in the host shell with "${preflight.socketProbeCommand}"; if it passes there, run telemetry:validation-ready and smoke/manual validation from that shell instead.`;
  }

  if (!preflight.chromiumAvailable || !preflight.distReady) {
    return 'Install Chromium or rebuild dist before attempting browser validation smoke.';
  }

  if (status === 'ready') {
    return smokeRequested
      ? 'Smoke was not requested. Re-run with --with-smoke or execute telemetry:browser-validation-smoke, then collect a 5-run manual sample with R/V.'
      : 'Run telemetry:browser-validation-smoke next, then collect a 5-run manual sample with R/V.';
  }

  if (status === 'smoke-failed') {
    return 'Inspect smoke stderr/stdout, fix the browser validation flow, then retry before manual sampling.';
  }

  return 'Browser automation path is ready; collect a 5-run manual sample with R/V and compare against the deterministic baseline.';
};

const main = async (): Promise<void> => {
  const smokeRequested = process.argv.includes('--with-smoke');
  const guardResult = await runNodeScript('scripts/telemetry-check.ts');

  if (!guardResult.ok) {
    const output = {
      status: 'guard-failed' satisfies ValidationReadyStatus,
      smokeRequested,
      guard: {
        ok: false,
        message: summarizeGuardFailure(guardResult),
      },
      nextAction: 'Fix deterministic telemetry guard drift before attempting browser validation.',
    };

    console.log(JSON.stringify(output, null, 2));
    process.exitCode = 1;
    return;
  }

  const validationSnapshot = createValidationSnapshotReport();
  const preflight = await runBrowserValidationPreflight();
  const blockingIssues = getBrowserValidationBlockingIssues(preflight);

  let status: ValidationReadyStatus = blockingIssues.length === 0 ? 'ready' : 'blocked';
  let smoke: { attempted: boolean; ok: boolean; stdout?: string; stderr?: string; exitCode?: number | null } = {
    attempted: false,
    ok: false,
  };

  if (smokeRequested && blockingIssues.length === 0) {
    const smokeResult = await runNodeScript('scripts/browser-validation-smoke.ts');
    smoke = {
      attempted: true,
      ok: smokeResult.ok,
      stdout: smokeResult.stdout,
      stderr: smokeResult.ok ? undefined : smokeResult.stderr,
      exitCode: smokeResult.ok ? 0 : smokeResult.exitCode,
    };
    status = smokeResult.ok ? 'smoke-passed' : 'smoke-failed';
  }

  const output = {
    status,
    smokeRequested,
    guard: {
      ok: true,
    },
    validationSnapshot: {
      validationSummary: validationSnapshot.validationSummary,
      sampleRunSeeds: validationSnapshot.sampleRunSeeds,
      sampleRunTimes: validationSnapshot.sampleRunTimes,
    },
    preflight: {
      status: blockingIssues.length === 0 ? 'ok' : 'blocked',
      ...preflight,
      blockingIssues,
    },
    smoke,
    nextAction: buildNextAction(status, preflight, smokeRequested),
  };

  console.log(JSON.stringify(output, null, 2));

  if (status !== 'ready' && status !== 'smoke-passed') {
    process.exitCode = 1;
  }
};

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});

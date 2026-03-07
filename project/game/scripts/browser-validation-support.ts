import { access } from 'node:fs/promises';
import net from 'node:net';
import { constants as fsConstants } from 'node:fs';

const CHROMIUM_PATH = '/usr/bin/chromium';
const DIST_INDEX_PATH = new URL('../dist/index.html', import.meta.url);

export type BrowserValidationPreflight = {
  chromiumPath: string;
  chromiumAvailable: boolean;
  distIndexPath: string;
  distReady: boolean;
  loopbackSocketsAvailable: boolean;
  loopbackError: string | null;
};

const canAccess = async (path: string, mode: number): Promise<boolean> => {
  try {
    await access(path, mode);
    return true;
  } catch {
    return false;
  }
};

export const assertLoopbackSocketsAvailable = async (): Promise<void> =>
  new Promise((resolve, reject) => {
    const server = net.createServer();

    server.once('error', (error) => {
      server.close();
      reject(
        new Error(
          `Loopback socket bind failed in this environment. Browser validation smoke needs local HTTP/CDP ports. Original error: ${
            error instanceof Error ? error.message : String(error)
          }`,
        ),
      );
    });

    server.listen(0, '127.0.0.1', () => {
      server.close(() => resolve());
    });
  });

export const runBrowserValidationPreflight = async (): Promise<BrowserValidationPreflight> => {
  const chromiumAvailable = await canAccess(CHROMIUM_PATH, fsConstants.X_OK);
  const distReady = await canAccess(DIST_INDEX_PATH.pathname, fsConstants.R_OK);

  let loopbackSocketsAvailable = false;
  let loopbackError: string | null = null;

  try {
    await assertLoopbackSocketsAvailable();
    loopbackSocketsAvailable = true;
  } catch (error) {
    loopbackError = error instanceof Error ? error.message : String(error);
  }

  return {
    chromiumPath: CHROMIUM_PATH,
    chromiumAvailable,
    distIndexPath: DIST_INDEX_PATH.pathname,
    distReady,
    loopbackSocketsAvailable,
    loopbackError,
  };
};

export const getBrowserValidationBlockingIssues = (
  preflight: BrowserValidationPreflight,
): string[] => {
  const issues: string[] = [];

  if (!preflight.chromiumAvailable) {
    issues.push(`Chromium binary is not executable at ${preflight.chromiumPath}.`);
  }

  if (!preflight.distReady) {
    issues.push(`Build output is missing at ${preflight.distIndexPath}; run npm run build first.`);
  }

  if (!preflight.loopbackSocketsAvailable) {
    issues.push(preflight.loopbackError ?? 'Loopback sockets are unavailable.');
  }

  return issues;
};

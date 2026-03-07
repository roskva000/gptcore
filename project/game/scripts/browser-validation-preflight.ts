import {
  getBrowserValidationActionPlan,
  getBrowserValidationBlockingIssues,
  getBrowserValidationRuntimeScope,
  runBrowserValidationPreflight,
} from './browser-validation-support.ts';

const main = async (): Promise<void> => {
  const preflight = await runBrowserValidationPreflight();
  const blockingIssues = getBrowserValidationBlockingIssues(preflight);

  console.log(
    JSON.stringify(
      {
        status: blockingIssues.length === 0 ? 'ok' : 'blocked',
        blockerScope: getBrowserValidationRuntimeScope(preflight),
        ...preflight,
        blockingIssues,
        nextSteps: getBrowserValidationActionPlan(preflight),
      },
      null,
      2,
    ),
  );

  if (blockingIssues.length > 0) {
    process.exitCode = 1;
  }
};

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});

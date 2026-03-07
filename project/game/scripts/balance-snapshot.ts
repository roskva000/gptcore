import { createBalanceSnapshotReport } from './telemetry-reports.ts';

console.log(JSON.stringify(createBalanceSnapshotReport(), null, 2));

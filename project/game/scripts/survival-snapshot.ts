import { createSurvivalSnapshotReport } from './telemetry-reports.ts';

console.log(JSON.stringify(createSurvivalSnapshotReport(), null, 2));

export type RunSignatureId = 'pinpoint' | 'weave' | 'rush';

export type RunSignature = {
  id: RunSignatureId;
  label: string;
  shortLabel: string;
  waitingEyebrow: string;
  waitingBody: string;
  supportLine: string;
  introBody: string;
  rematchLine: string;
  overlayCallout: string;
  accentColor: number;
  accentBackgroundColor: string;
  accentTextColor: string;
  spawnDelayMultiplier: number;
  obstacleSpeedMultiplier: number;
  targetLagOffsetSeconds: number;
};

const RUN_SIGNATURES: readonly RunSignature[] = [
  {
    id: 'pinpoint',
    label: 'PINPOINT RUN',
    shortLabel: 'PINPOINT',
    waitingEyebrow: 'NEXT RUN | PINPOINT',
    waitingBody: 'Tighter lead and shorter lag.\nCut later, trust smaller air, and keep the lane honest.',
    supportLine: 'PINPOINT RUN: tighter lead is live. Cut later and protect smaller air.',
    introBody: 'Tighter lead opens first. Cut later, trust smaller air, and let the lane stay narrow for one more beat.',
    rematchLine: 'PINPOINT REMATCH: cut later and protect smaller air.',
    overlayCallout: 'PINPOINT SNAPSHOT',
    accentColor: 0xffc18a,
    accentBackgroundColor: '#5a2b1b',
    accentTextColor: '#ffe7c8',
    spawnDelayMultiplier: 1.03,
    obstacleSpeedMultiplier: 0.99,
    targetLagOffsetSeconds: -0.035,
  },
  {
    id: 'weave',
    label: 'WEAVE RUN',
    shortLabel: 'WEAVE',
    waitingEyebrow: 'NEXT RUN | WEAVE',
    waitingBody: 'Shots reach a little wider before they settle.\nStay fluid, re-center less, and let the lane breathe once.',
    supportLine: 'WEAVE RUN: wider lag is live. Stay fluid and do not over-correct the reopen.',
    introBody: 'Wider lag opens the route. Stay fluid, re-center less, and let the lane breathe before you cash it back in.',
    rematchLine: 'WEAVE REMATCH: stay fluid and let the lane breathe once.',
    overlayCallout: 'WEAVE SNAPSHOT',
    accentColor: 0x8ff0d9,
    accentBackgroundColor: '#173b31',
    accentTextColor: '#d7fff2',
    spawnDelayMultiplier: 0.98,
    obstacleSpeedMultiplier: 1.01,
    targetLagOffsetSeconds: 0.045,
  },
  {
    id: 'rush',
    label: 'RUSH RUN',
    shortLabel: 'RUSH',
    waitingEyebrow: 'NEXT RUN | RUSH',
    waitingBody: 'Cadence lands earlier and pressure keeps closer pace.\nTrade comfort for rhythm and keep moving before the snap.',
    supportLine: 'RUSH RUN: earlier cadence is live. Keep moving before the lane can settle.',
    introBody: 'Earlier cadence lands immediately. Trade comfort for rhythm and move before the lane can settle.',
    rematchLine: 'RUSH REMATCH: move early and keep the lane from settling.',
    overlayCallout: 'RUSH SNAPSHOT',
    accentColor: 0xff8aa1,
    accentBackgroundColor: '#561d23',
    accentTextColor: '#ffe1e7',
    spawnDelayMultiplier: 0.96,
    obstacleSpeedMultiplier: 1.025,
    targetLagOffsetSeconds: -0.01,
  },
] as const;

export const getRunSignatureForRunNumber = (runNumber: number): RunSignature =>
  RUN_SIGNATURES[((runNumber % RUN_SIGNATURES.length) + RUN_SIGNATURES.length) % RUN_SIGNATURES.length];

export const applyRunSignatureTargetLag = ({
  baseTargetLagSeconds,
  signature,
}: {
  baseTargetLagSeconds: number;
  signature: RunSignature;
}): number => Math.max(0, baseTargetLagSeconds + signature.targetLagOffsetSeconds);

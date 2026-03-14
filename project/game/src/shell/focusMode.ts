export type GamePhase = 'waiting' | 'playing' | 'paused' | 'gameOver';

export const isGameplayViewportAnchorPhase = (phase: GamePhase): boolean =>
  phase === 'playing' || phase === 'paused';

export const shouldRestorePanelScroll = ({
  phase,
  savedPanelScrollY,
}: {
  phase: GamePhase;
  savedPanelScrollY: number | null;
}): boolean => savedPanelScrollY !== null && phase === 'waiting';

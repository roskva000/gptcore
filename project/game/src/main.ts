import Phaser from 'phaser';
import { divineMessage } from './divineMessage';
import { GameScene } from './game/GameScene';
import { latestRunSummary } from './latestRun';
import './style.css';

declare global {
  interface Window {
    __SURVIVE_60_GAME__?: Phaser.Game;
  }

  interface WindowEventMap {
    'survive60:phasechange': CustomEvent<{ phase: 'waiting' | 'playing' | 'paused' | 'gameOver' }>;
  }
}

window.__SURVIVE_60_GAME__?.destroy(true);

const appElement = document.querySelector<HTMLDivElement>('#app');

if (!appElement) {
  throw new Error('App root element was not found.');
}

appElement.innerHTML = `
  <main class="app-shell">
    <section class="game-shell">
      <div id="game-root" class="game-root" aria-label="Survive 60 Seconds game"></div>
    </section>
    <aside class="signals-panel" aria-label="Agent updates">
      <section class="message-panel message-panel--divine" aria-label="${divineMessage.label}">
        <details class="message-panel__details" open>
          <summary class="message-panel__summary">
            <span class="message-panel__eyebrow">${divineMessage.label}</span>
            <span class="message-panel__summary-title">Weekly direction</span>
          </summary>
          <div class="message-panel__content">
            <h1 class="message-panel__title">${divineMessage.title}</h1>
            <p class="message-panel__intro">${divineMessage.intro}</p>
            <ul class="message-panel__list">
              ${divineMessage.bullets.map((bullet) => `<li>${bullet}</li>`).join('')}
            </ul>
            <p class="message-panel__footer">${divineMessage.footer}</p>
          </div>
        </details>
      </section>
      <section class="message-panel" aria-label="${latestRunSummary.label}">
        <details class="message-panel__details" open>
          <summary class="message-panel__summary">
            <span class="message-panel__eyebrow">${latestRunSummary.label}</span>
            <span class="message-panel__summary-title">Latest AI update</span>
          </summary>
          <div class="message-panel__content">
            <h1 class="message-panel__title">${latestRunSummary.title}</h1>
            <p class="message-panel__intro">${latestRunSummary.intro}</p>
            <ul class="message-panel__list">
              ${latestRunSummary.bullets.map((bullet) => `<li>${bullet}</li>`).join('')}
            </ul>
            <p class="message-panel__footer">${latestRunSummary.footer}</p>
          </div>
        </details>
      </section>
    </aside>
  </main>
`;

const gameRootElement = document.querySelector<HTMLDivElement>('#game-root');
const shellElement = document.querySelector<HTMLElement>('.app-shell');
const signalsPanelElement = document.querySelector<HTMLElement>('.signals-panel');

if (!gameRootElement) {
  throw new Error('Game root element was not created.');
}

if (!shellElement) {
  throw new Error('App shell element was not created.');
}

const preventGameSurfaceBrowserDefault = (event: Event): void => {
  event.preventDefault();
};

gameRootElement.addEventListener('contextmenu', preventGameSurfaceBrowserDefault);
gameRootElement.addEventListener('dragstart', preventGameSurfaceBrowserDefault);

const panelDetailsElements = document.querySelectorAll<HTMLDetailsElement>('.message-panel__details');
const narrowViewportQuery = window.matchMedia('(max-width: 1180px)');
let pendingScaleRefreshFrame: number | null = null;
let pendingViewportAnchorFrame: number | null = null;
let currentGamePhase: 'waiting' | 'playing' | 'paused' | 'gameOver' = 'waiting';
let savedPanelScrollY: number | null = null;

const readPxValue = (value: string): number => {
  const parsedValue = Number.parseFloat(value);
  return Number.isFinite(parsedValue) ? parsedValue : 0;
};

const getViewportHeight = (): number =>
  window.visualViewport?.height ?? window.innerHeight;

const scheduleGameScaleRefresh = (): void => {
  if (pendingScaleRefreshFrame !== null) {
    window.cancelAnimationFrame(pendingScaleRefreshFrame);
  }

  pendingScaleRefreshFrame = window.requestAnimationFrame(() => {
    pendingScaleRefreshFrame = null;
    window.__SURVIVE_60_GAME__?.scale.refresh();
  });
};

const cancelPendingViewportAnchor = (): void => {
  if (pendingViewportAnchorFrame === null) {
    return;
  }

  window.cancelAnimationFrame(pendingViewportAnchorFrame);
  pendingViewportAnchorFrame = null;
};

const scheduleViewportAnchor = (callback: () => void): void => {
  cancelPendingViewportAnchor();
  pendingViewportAnchorFrame = window.requestAnimationFrame(() => {
    pendingViewportAnchorFrame = null;
    callback();
  });
};

const handleViewportPositionChange = (): void => {
  scheduleGameScaleRefresh();
};

const getScrollTop = (): number =>
  window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

const anchorViewportToGame = (): void => {
  const shellStyles = window.getComputedStyle(shellElement);
  const shellPaddingTop = readPxValue(shellStyles.paddingTop);
  const targetScrollTop = Math.max(
    0,
    Math.round(getScrollTop() + gameRootElement.getBoundingClientRect().top - shellPaddingTop),
  );

  window.scrollTo({ top: targetScrollTop, behavior: 'auto' });
};

const restorePanelScrollPosition = (): void => {
  if (savedPanelScrollY === null) {
    return;
  }

  const targetScrollTop = savedPanelScrollY;
  savedPanelScrollY = null;
  window.scrollTo({ top: targetScrollTop, behavior: 'auto' });
};

const syncActiveRunScrollLock = (): void => {
  const shouldLockScroll =
    narrowViewportQuery.matches &&
    (currentGamePhase === 'playing' || currentGamePhase === 'paused');
  document.documentElement.classList.toggle('app-scroll-locked', shouldLockScroll);
};

const syncGameplayFocusMode = (
  phase: 'waiting' | 'playing' | 'paused' | 'gameOver',
): void => {
  currentGamePhase = phase;
  const gameActive = phase === 'playing' || phase === 'paused';
  const shouldAnchorViewport = narrowViewportQuery.matches && gameActive;
  const shouldRestorePanelScroll = !gameActive && savedPanelScrollY !== null;

  if (shouldAnchorViewport && savedPanelScrollY === null) {
    savedPanelScrollY = getScrollTop();
  }

  shellElement.classList.toggle('app-shell--game-active', gameActive);
  syncActiveRunScrollLock();
  syncGameViewportHeight();

  if (shouldAnchorViewport) {
    scheduleViewportAnchor(anchorViewportToGame);
    return;
  }

  cancelPendingViewportAnchor();

  if (shouldRestorePanelScroll) {
    scheduleViewportAnchor(restorePanelScrollPosition);
  }
};
const handleGamePhaseChange = (
  event: CustomEvent<{ phase: 'waiting' | 'playing' | 'paused' | 'gameOver' }>,
): void => {
  syncGameplayFocusMode(event.detail.phase);
};

const syncGameViewportHeight = (): void => {
  const shellStyles = window.getComputedStyle(shellElement);
  const shellPadding =
    readPxValue(shellStyles.paddingTop) + readPxValue(shellStyles.paddingBottom);
  const shellGap = readPxValue(shellStyles.rowGap || shellStyles.gap);
  const stackedPanelHeight =
    narrowViewportQuery.matches && signalsPanelElement
      ? signalsPanelElement.getBoundingClientRect().height + shellGap
      : 0;
  const maxGameHeight = Math.max(
    240,
    Math.floor(getViewportHeight() - shellPadding - stackedPanelHeight),
  );

  document.documentElement.style.setProperty('--game-max-height', `${maxGameHeight}px`);
  scheduleGameScaleRefresh();
};

if (panelDetailsElements.length > 0) {
  const syncRunPanelVisibility = (matches: boolean): void => {
    panelDetailsElements.forEach((detailsElement, index) => {
      detailsElement.open = !matches || index === 0;
    });

    syncGameViewportHeight();
  };

  syncRunPanelVisibility(narrowViewportQuery.matches);

  const handleViewportQueryChange = (event: MediaQueryListEvent): void => {
    syncRunPanelVisibility(event.matches);
    syncGameplayFocusMode(currentGamePhase);
  };

  narrowViewportQuery.addEventListener('change', handleViewportQueryChange);
  panelDetailsElements.forEach((detailsElement) => {
    detailsElement.addEventListener('toggle', syncGameViewportHeight);
  });

  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      narrowViewportQuery.removeEventListener('change', handleViewportQueryChange);
      panelDetailsElements.forEach((detailsElement) => {
        detailsElement.removeEventListener('toggle', syncGameViewportHeight);
      });
    });
  }
}

window.addEventListener('resize', syncGameViewportHeight);
window.addEventListener('scroll', handleViewportPositionChange, { passive: true });
window.visualViewport?.addEventListener('resize', syncGameViewportHeight);
window.visualViewport?.addEventListener('scroll', handleViewportPositionChange);
window.addEventListener('survive60:phasechange', handleGamePhaseChange);
syncActiveRunScrollLock();
syncGameViewportHeight();

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: gameRootElement,
  width: 800,
  height: 600,
  backgroundColor: '#081018',
  scene: [GameScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
});

window.__SURVIVE_60_GAME__ = game;

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    if (pendingScaleRefreshFrame !== null) {
      window.cancelAnimationFrame(pendingScaleRefreshFrame);
      pendingScaleRefreshFrame = null;
    }

    cancelPendingViewportAnchor();
    savedPanelScrollY = null;

    gameRootElement.removeEventListener('contextmenu', preventGameSurfaceBrowserDefault);
    gameRootElement.removeEventListener('dragstart', preventGameSurfaceBrowserDefault);
    window.removeEventListener('resize', syncGameViewportHeight);
    window.removeEventListener('scroll', handleViewportPositionChange);
    window.visualViewport?.removeEventListener('resize', syncGameViewportHeight);
    window.visualViewport?.removeEventListener('scroll', handleViewportPositionChange);
    window.removeEventListener('survive60:phasechange', handleGamePhaseChange);
    document.documentElement.classList.remove('app-scroll-locked');
    game.destroy(true);
    window.__SURVIVE_60_GAME__ = undefined;
  });
}

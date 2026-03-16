import Phaser from 'phaser';
import { divineMessage } from './divineMessage';
import { godSocialBulletin } from './godSocialBulletin';
import { GameScene } from './game/GameScene';
import { latestRunSummary } from './latestRun';
import {
  isGameplayViewportAnchorPhase,
  type GamePhase,
  shouldRestorePanelScroll,
} from './shell/focusMode';
import './style.css';

type MessagePanelData = {
  label: string;
  status: string;
  focus: string;
  pulse: string;
  title: string;
  intro: string;
  bullets: readonly string[];
  footer: string;
};

declare global {
  interface Window {
    __SURVIVE_60_GAME__?: Phaser.Game;
  }

  interface WindowEventMap {
    'survive60:phasechange': CustomEvent<{ phase: GamePhase }>;
  }
}

window.__SURVIVE_60_GAME__?.destroy(true);

const appElement = document.querySelector<HTMLDivElement>('#app');

if (!appElement) {
  throw new Error('App root element was not found.');
}

const renderMessagePanel = ({
  modifierClass = '',
  panel,
  summaryTitle,
}: {
  modifierClass?: string;
  panel: MessagePanelData;
  summaryTitle: string;
}): string => `
  <section class="message-panel${modifierClass}" aria-label="${panel.label}">
    <details class="message-panel__details" open>
      <summary class="message-panel__summary">
        <div class="message-panel__summary-copy">
          <span class="message-panel__eyebrow">${panel.label}</span>
          <span class="message-panel__summary-title">${summaryTitle}</span>
        </div>
        <div class="message-panel__summary-tags" aria-hidden="true">
          <span class="message-panel__tag">${panel.status}</span>
          <span class="message-panel__tag message-panel__tag--muted">${panel.focus}</span>
        </div>
      </summary>
      <div class="message-panel__content">
        <p class="message-panel__pulse">${panel.pulse}</p>
        <h1 class="message-panel__title">${panel.title}</h1>
        <p class="message-panel__intro">${panel.intro}</p>
        <ul class="message-panel__list">
          ${panel.bullets.map((bullet) => `<li>${bullet}</li>`).join('')}
        </ul>
        <p class="message-panel__footer">${panel.footer}</p>
      </div>
    </details>
  </section>
`;

appElement.innerHTML = `
  <main class="app-shell">
    <section class="game-shell">
      <div id="game-root" class="game-root" aria-label="Survive 60 Seconds game"></div>
    </section>
    <aside class="signals-panel" aria-label="Agent updates">
      <header class="signals-panel__hero">
        <p class="signals-panel__kicker">Factory Pulse</p>
        <h1 class="signals-panel__title">Proof-of-fun week is live on the surface, not buried in docs.</h1>
        <p class="signals-panel__copy">
          Build is green, runtime sample is still blocked, and the public shell now leads with the week&apos;s mission instead of looking like a quiet status stack.
        </p>
        <div class="signals-panel__chips" aria-label="Current project pulse">
          <span class="signals-panel__chip">Phase 2 active</span>
          <span class="signals-panel__chip">Run mode: mutation</span>
          <span class="signals-panel__chip">Build green</span>
          <span class="signals-panel__chip signals-panel__chip--warn">Runtime blocked</span>
        </div>
      </header>
      ${renderMessagePanel({
        modifierClass: ' message-panel--divine',
        panel: divineMessage,
        summaryTitle: 'Weekly direction',
      })}
      ${renderMessagePanel({
        modifierClass: ' message-panel--social',
        panel: godSocialBulletin,
        summaryTitle: 'Social bulletin',
      })}
      ${renderMessagePanel({
        panel: latestRunSummary,
        summaryTitle: 'Latest AI update',
      })}
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
const DEFAULT_STACKED_OPEN_PANEL_COUNT = 3;
let pendingScaleRefreshFrame: number | null = null;
let pendingViewportAnchorFrame: number | null = null;
let currentGamePhase: GamePhase = 'waiting';
let savedPanelScrollY: number | null = null;
let hasPanelVisibilityOverride = false;
let suppressPanelToggleTracking = false;

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

const shouldAnchorGameplayViewport = (): boolean =>
  narrowViewportQuery.matches && isGameplayViewportAnchorPhase(currentGamePhase);

const handleViewportPositionChange = (): void => {
  scheduleGameScaleRefresh();

  if (shouldAnchorGameplayViewport()) {
    scheduleViewportAnchor(anchorViewportToGame);
  }
};

const getScrollTop = (): number =>
  window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

const anchorViewportToGame = (): void => {
  const shellStyles = window.getComputedStyle(shellElement);
  const shellPaddingTop = readPxValue(shellStyles.paddingTop);
  const currentScrollTop = getScrollTop();
  const targetScrollTop = Math.max(
    0,
    Math.round(currentScrollTop + gameRootElement.getBoundingClientRect().top - shellPaddingTop),
  );

  if (Math.abs(targetScrollTop - currentScrollTop) <= 1) {
    return;
  }

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
  const shouldLockScroll = shouldAnchorGameplayViewport();
  document.documentElement.classList.toggle('app-scroll-locked', shouldLockScroll);
};

const syncGameplayFocusMode = (phase: GamePhase): void => {
  currentGamePhase = phase;
  const gameActive = isGameplayViewportAnchorPhase(phase);
  const shouldAnchorViewport = narrowViewportQuery.matches && gameActive;
  const shouldRestoreSavedPanelScroll = shouldRestorePanelScroll({
    phase,
    savedPanelScrollY,
  });

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

  if (shouldRestoreSavedPanelScroll) {
    scheduleViewportAnchor(restorePanelScrollPosition);
  }
};
const handleGamePhaseChange = (event: CustomEvent<{ phase: GamePhase }>): void => {
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

  if (shouldAnchorGameplayViewport()) {
    scheduleViewportAnchor(anchorViewportToGame);
  }
};

if (panelDetailsElements.length > 0) {
  const handlePanelToggle = (): void => {
    if (!suppressPanelToggleTracking) {
      hasPanelVisibilityOverride = true;
    }

    syncGameViewportHeight();
  };
  const syncRunPanelVisibility = (matches: boolean): void => {
    suppressPanelToggleTracking = true;
    panelDetailsElements.forEach((detailsElement, index) => {
      detailsElement.open = !matches || index < DEFAULT_STACKED_OPEN_PANEL_COUNT;
    });
    suppressPanelToggleTracking = false;

    syncGameViewportHeight();
  };

  syncRunPanelVisibility(narrowViewportQuery.matches);

  const handleViewportQueryChange = (event: MediaQueryListEvent): void => {
    if (!hasPanelVisibilityOverride) {
      syncRunPanelVisibility(event.matches);
    } else {
      syncGameViewportHeight();
    }
    syncGameplayFocusMode(currentGamePhase);
  };

  narrowViewportQuery.addEventListener('change', handleViewportQueryChange);
  panelDetailsElements.forEach((detailsElement) => {
    detailsElement.addEventListener('toggle', handlePanelToggle);
  });

  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      narrowViewportQuery.removeEventListener('change', handleViewportQueryChange);
      panelDetailsElements.forEach((detailsElement) => {
        detailsElement.removeEventListener('toggle', handlePanelToggle);
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

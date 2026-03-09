import Phaser from 'phaser';
import { divineMessage } from './divineMessage';
import { GameScene } from './game/GameScene';
import { latestRunSummary } from './latestRun';
import './style.css';

declare global {
  interface Window {
    __SURVIVE_60_GAME__?: Phaser.Game;
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

const panelDetailsElements = document.querySelectorAll<HTMLDetailsElement>('.message-panel__details');

if (panelDetailsElements.length > 0) {
  const narrowViewportQuery = window.matchMedia('(max-width: 1180px)');

  const syncRunPanelVisibility = (matches: boolean): void => {
    panelDetailsElements.forEach((detailsElement, index) => {
      detailsElement.open = !matches || index === 0;
    });
  };

  syncRunPanelVisibility(narrowViewportQuery.matches);

  narrowViewportQuery.addEventListener('change', (event) => {
    syncRunPanelVisibility(event.matches);
  });
}

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game-root',
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
    game.destroy(true);
    window.__SURVIVE_60_GAME__ = undefined;
  });
}

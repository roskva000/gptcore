import Phaser from 'phaser';
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
    <aside class="run-panel" aria-label="${latestRunSummary.label}">
      <p class="run-panel__eyebrow">${latestRunSummary.label}</p>
      <h1 class="run-panel__title">${latestRunSummary.title}</h1>
      <p class="run-panel__intro">${latestRunSummary.intro}</p>
      <ul class="run-panel__list">
        ${latestRunSummary.bullets.map((bullet) => `<li>${bullet}</li>`).join('')}
      </ul>
      <p class="run-panel__footer">${latestRunSummary.footer}</p>
    </aside>
  </main>
`;

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

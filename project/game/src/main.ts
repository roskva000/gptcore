import Phaser from 'phaser';
import { GameScene } from './game/GameScene';
import './style.css';

declare global {
  interface Window {
    __SURVIVE_60_GAME__?: Phaser.Game;
  }
}

window.__SURVIVE_60_GAME__?.destroy(true);

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'app',
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

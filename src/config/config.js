import Phaser from 'phaser';

import BootScene from '../scenes/BootScene';
import TitleScene from '../scenes/TitleScene';
import GameScene from '../scenes/GameScene';
import PreloaderScene from '../scenes/PreloaderScene';
import GameOver from '../scenes/GameOver';
import gameDefaults from './gameDefaults';

const { gameWidth, gameHeight } = gameDefaults;

export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: gameWidth,
  height: gameHeight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 200,
      },
      debug: true,
    },
  },
  dom: {
    createContainer: true,
  },
  scene: [BootScene, PreloaderScene, TitleScene, GameScene, GameOver],
};
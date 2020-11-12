import '@babel/polyfill';
import '../styles.css';
import Phaser from 'phaser';
import config from './config/config';

class JumpGame extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.start('Boot');
  }
}

window.game = new JumpGame();
import "@babel/polyfill";
import Phaser from "phaser";
import config from "./config/config";
// import {createAGame} from './utils/leaderBoardHandler';
import gameDefaults from './config/gameDefaults'


class JumpGame extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.start('Boot');
  }
}

window.game = new JumpGame();
import Phaser from "phaser";

import titleBackground from '../assets/title_background.jpg';
import ball from '../assets/ball.png';

export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }
 
  preload () {
    this.load.image('titleBackground', titleBackground);
    this.load.image('ball', ball);
  }
 
  create () {
    this.scene.start('Preloader');
  }
};
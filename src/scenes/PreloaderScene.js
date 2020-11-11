import Phaser from 'phaser';
import background from '../assets/bg_layer1.png';
import platform from '../assets/ground_grass.png';
import star from '../assets/star.png';
import impact from '../assets/sfx/impactPlate_light.mp3';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    this.load.image('background', background);
    this.load.image('platform', platform);
    this.load.image('star', star);
    this.load.audio('impact', impact);
    // for (var i = 0; i < 50; i++) {
    //   this.load.image('background'+i, background);
    // }

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;

    this.add.image(400, 300, 'titleBackground').setOrigin(0.5, 0.5);
    this.logo = this.add.image(width / 2, height / 2 - 100, 'ball').setOrigin(0.5, 0.5);
    this.logo.displayWidth = 100;
    this.logo.displayHeight = 100;

    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(235, 316, 320, 50);
    const progressBar = this.add.graphics();

    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 24,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 75,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#fff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(235, 321, 320 * value, 40);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });
  }

  create() {
  }

  ready() {
    this.scene.start('Title');
  }
}

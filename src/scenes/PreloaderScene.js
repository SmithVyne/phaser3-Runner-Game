import Phaser from "phaser";
import background from "../assets/bg_layer1.png";
import platform from "../assets/ground_grass.png";
import star from '../assets/star.png';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload () { 
    this.load.image('background', background);
    this.load.image('platform', platform);
    this.load.image('star', star);
    // for (var i = 0; i < 50; i++) {
    //   this.load.image('background'+i, background);
    // }
    
    let width = this.cameras.main.width;
    let height = this.cameras.main.height;

    this.add.image(400, 300, 'titleBackground').setOrigin(0.5, 0.5);
    this.logo = this.add.image(width/2, height/2 - 100, 'ball').setOrigin(0.5, 0.5);
    this.logo.displayWidth = 100;
    this.logo.displayHeight = 100;
    
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(235, 316, 320, 50);
    let progressBar = this.add.graphics();

    let loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 24,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    let percentText = this.make.text({
      x: width / 2,
      y: height / 2,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    let assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 75,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#fff'
      }
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(235, 321, 320 * value, 40);
    });

    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });

    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    }.bind(this));

  }
 
  create () {
  }
   
  ready () {
    this.scene.start('Title');
  }
}

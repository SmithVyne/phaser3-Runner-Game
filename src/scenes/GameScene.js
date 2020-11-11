import Phaser from "phaser";
import {createNewScore} from '../utils/leaderBoardHandler';
import gameDefaults from '../config/gameDefaults';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');  
  }
 
  preload () {  
  }
 
  create () {
    let camera = this.cameras.main;
    this.add.image(400, 300, 'background').setScrollFactor(0, 0);
    this.platforms = this.physics.add.staticGroup();

    this.stars = this.physics.add.group();
    
    for (let i = 2; i < 6; ++i)
    {
      const x = 250 * i;
      const y = Phaser.Math.Between(200, 350);
      const platform = this.platforms.create(x, y, 'platform');
      platform.scale = 0.5;
      platform.setOrigin(1, 1);
      this.addCarrotsHere(platform);
      
      const body = platform.body
      body.updateFromGameObject()
    }

    this.playerJumps = 0;
    this.player = this.physics.add.image(405, 0, 'ball').setBounce(0);
    this.player.displayWidth = 40;
    this.player.displayHeight = 40;
    this.physics.add.collider(this.platforms, this.player);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
    this.cursors = this.input.keyboard.createCursorKeys();
    // camera.scrollX -= 250;
    this.scoreBoard = this.add.text(300, 16, 'Score: 0', { fontSize: '32px', fill: '#000', weight: 'bold' }).setScrollFactor(0, 0);
    this.score = 0;

    let keyUp = this.input.keyboard.addKey('UP');
    keyUp.on('down', this.jump, this);
  }

  update() {
    let camera = this.cameras.main;
    if (this.cursors.right.isDown) { 
      this.player.setVelocityX(250);
    } 
    else if (this.cursors.left.isDown) {
      this.player.setVelocityX(-150);
    }
    
    camera.scrollX += 2;
    let worldCords = camera.worldView;
    let left = worldCords.left;
    let right = worldCords.right;
    let playrX = this.player.x;
    let playrY = this.player.y;
    
    if (playrX >= camera.midPoint.x) {
      camera.startFollow(this.player, false, 0.1, 1);
    }
    if (playrY<200 || playrY >350) {
      camera.stopFollow();
      if (playrY > 500) {
        this.gameOver();
      }
    }

    this.platforms.children.iterate(child => {
      const platform = child;  
      if (platform.x <= left ) {
        platform.x = right + 250;
        this.addCarrotsHere(platform)
        platform.body.updateFromGameObject();
      }
    });
  }

  addCarrotsHere(platform) {
    let x = platform.x - (platform.displayWidth);
    let y = platform.y - (platform.displayHeight+30);
    let a = Phaser.Math.Between(2, 3);

    for (let i = 1; i<=a; ++i) {
      x = x + 50;
      this.stars.create(x, y, 'star').setOrigin(0,0);
    }
  }
  
  collectStar (player, star)
  {
    this.stars.killAndHide(star);
    this.physics.world.disableBody(star.body);
    this.score += 3;
    this.scoreBoard.setText(`Score: ${this.score}`);
  }

  gameOver() {
    gameDefaults.playerScore = this.score;
    const {gameURL} = gameDefaults;
    createNewScore(gameDefaults.playerName, this.score, gameURL) && 
    this.scene.start('GameOver');
  }

  jump() {
    if (this.playerJumps < 2) {
      this.player.setVelocityY(-250);
      this.playerJumps++;
    }
    else if (this.player.body.touching.down && this.playerJumps>=2) {
      this.player.setVelocityY(-250);
      this.playerJumps = 1;
    }
  }

};
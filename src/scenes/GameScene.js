import Phaser from 'phaser';
import { createNewScore } from '../utils/leaderBoardHandler';
import gameDefaults from '../config/gameDefaults';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
  }

  create() {
    const camera = this.cameras.main;
    this.add.image(400, 300, 'background').setScrollFactor(0, 0);
    this.platforms = this.physics.add.staticGroup();

    this.stars = this.physics.add.group();

    for (let i = 2; i < 6; ++i) {
      const x = 250 * i;
      const y = Phaser.Math.Between(200, 350);
      const platform = this.platforms.create(x, y, 'platform');
      platform.scale = 0.5;
      platform.setOrigin(1, 1);
      this.addCarrotsHere(platform);

      const { body } = platform;
      body.updateFromGameObject();
    }

    this.playerJumps = 0;
    this.player = this.physics.add.image(405, 0, 'ball').setBounce(0.8);
    this.player.displayWidth = 40;
    this.player.displayHeight = 40;
    this.physics.add.collider(this.platforms, this.player);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.scoreBoard = this.add.text(300, 16, 'Score: 0', { fontFamily: 'cursive', fontSize: '28px', fill: '#000' }).setScrollFactor(0, 0);
    this.score = 0;

    const keyUp = this.input.keyboard.addKey('UP');
    keyUp.on('down', this.jump, this);
  }

  update() {
    const camera = this.cameras.main;
    if (this.cursors.right.isDown) {
      this.player.setVelocityX(250);
    } else if (this.cursors.left.isDown) {
      this.player.setVelocityX(-150);
    } else if (this.cursors.down.isDown) {
      this.player.setBounce(0);
    }

    camera.scrollX += 2;
    const worldCords = camera.worldView;
    const { left } = worldCords;
    const { right } = worldCords;
    const playrX = this.player.x;
    const playrY = this.player.y;

    if (playrX >= camera.midPoint.x) {
      camera.startFollow(this.player, false, 0.1, 1);
    }
    if (playrY < 200 || playrY > 350) {
      camera.stopFollow();
      if (playrY > 500) {
        this.gameOver();
      }
    }

    this.platforms.children.iterate(child => {
      const platform = child;
      if (platform.x <= left) {
        platform.x = right + 250;
        this.addCarrotsHere(platform);
        platform.body.updateFromGameObject();
      }
    });
  }

  addCarrotsHere(platform) {
    let x = platform.x - (platform.displayWidth);
    const y = platform.y - (platform.displayHeight + 30);
    const a = Phaser.Math.Between(2, 3);

    for (let i = 1; i <= a; ++i) {
      x += 50;
      this.stars.create(x, y, 'star').setOrigin(0, 0);
    }
  }

  collectStar(player, star) {
    const a = Phaser.Math.Between(2, 3);
    this.stars.killAndHide(star);
    this.physics.world.disableBody(star.body);
    this.score += a;
    this.scoreBoard.setText(`Score: ${this.score}`);
    this.sound.play('impact');
  }

  gameOver() {
    gameDefaults.playerScore = this.score;
    const { gameURL } = gameDefaults;
    createNewScore(gameDefaults.playerName, this.score, gameURL)
    && this.scene.start('GameOver');
  }

  jump() {
    if (this.playerJumps < 2) {
      this.player.setVelocityY(-250);
      this.playerJumps++;
    } else if (this.player.body.touching.down && this.playerJumps >= 2) {
      this.player.setVelocityY(-250);
      this.playerJumps = 1;
    }
    this.player.setBounce(0.8);
  }
}
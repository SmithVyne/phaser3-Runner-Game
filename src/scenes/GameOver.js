import Phaser from 'phaser';
import gameDefaults from '../config/gameDefaults';
import { getAllScores } from '../utils/leaderBoardHandler';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  preload() {
    this.camera = this.cameras.main;
  }

  async create() {
    const {
      gameWidth, gameHeight, playerName, playerScore,
    } = gameDefaults;
    this.add.text(gameWidth / 2, gameHeight / 2 - 100, 'Game Over', { fontFamily: 'cursive', fontSize: '32px', fill: 'red' }).setOrigin(0.5, 0.5);
    this.add.text(gameWidth / 2, gameHeight / 2, 'LeaderBoard', { fontFamily: 'cursive', fontSize: '32px', fill: 'white' }).setOrigin(0.5, 0.5);
    const { gameURL } = gameDefaults;
    const scores = await getAllScores(gameURL);
    scores.sort((a, b) => b.score - a.score);

    const leaderDiv = document.createElement('div');
    leaderDiv.id = 'leaderDiv';

    scores.push({ user: playerName, score: playerScore });
    scores.forEach((item) => {
      this.addScoreToDisplay(leaderDiv, item.user, item.score);
    });

    const leaderDivObj = this.add.dom(gameWidth / 2, gameHeight / 2 + 50, leaderDiv);
    leaderDivObj.setOrigin(0.5, 0);
    console.log(scores);

    this.count = scores.length;
    this.counter = 0;

    this.input.keyboard.once('keydown_SPACE', () => {
      this.scene.start('game');
    });
  }

  update() {
    if (this.count > 10 && this.counter < this.count * 12.5) {
      this.camera.scrollY += 1.5;
      this.counter++;
    }
  }

  addScoreToDisplay(leaderDiv, user, score) {
    leaderDiv.innerHTML += `
    <div class='score'>
      <span>${this.capitalize(user)}</span>
      <span>${score} pts</span>
    </div>`;
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

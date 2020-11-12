import Phaser from 'phaser';
import gameDefaults from '../config/gameDefaults';
import { getAllScores } from '../utils/leaderBoardHandler';
import capitalize from '../utils/capitalizeString';

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
    this.add.text(gameWidth / 2, gameHeight / 2 - 204, 'Game Over', { fontFamily: 'cursive', fontSize: '32px', fill: 'red' }).setOrigin(0.5, 0.5);
    this.add.text(gameWidth / 2, gameHeight / 2 - 104, 'LeaderBoard', { fontFamily: 'cursive', fontSize: '32px', fill: 'white' }).setOrigin(0.5, 0.5);

    const leaderDiv = document.createElement('div');
    leaderDiv.id = 'leaderDiv';
    const { gameURL } = gameDefaults;

    const scores = await getAllScores(gameURL);
    scores.push({ user: playerName, score: playerScore });
    scores.sort((a, b) => b.score - a.score);
    scores.splice(10)
    
    scores.forEach((item) => {
      this.addScoreToDisplay(leaderDiv, item.user, item.score);
    });

    const leaderDivObj = this.add.dom(gameWidth / 2, gameHeight / 2 - 54, leaderDiv);
    leaderDivObj.setOrigin(0.5, 0);

    const playAgain = this.input.keyboard.addKey('SPACE');
    playAgain.on('down', () => this.scene.start('Game'), this);
  }

  addScoreToDisplay(leaderDiv, user, score) {
    leaderDiv.innerHTML += `
    <div class='score'>
      <span>${capitalize(user)}</span>
      <span>${score} pts</span>
    </div>`;
    return this;
  }
}

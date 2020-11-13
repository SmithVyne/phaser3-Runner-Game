import Phaser from 'phaser';
import gameDefaults from '../config/gameDefaults';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    const { gameWidth, gameHeight } = gameDefaults;

    // Background and Ball logo
    this.add.image(400, 300, 'titleBackground').setOrigin(0.5, 0.5);
    this.logo = this.add.image(gameWidth / 2, gameHeight / 2 - 100, 'ball').setOrigin(0.5, 0.5);
    this.logo.displayWidth = 100;
    this.logo.displayHeight = 100;

    const title = document.createElement('p');
    title.id = 'title';
    title.textContent = 'Ballie d Runner';
    this.add.dom(gameWidth / 2, 80, title).setOrigin(0.5, 1);

    // Player name text box
    const inputText = document.createElement('input');
    inputText.type = 'text';
    inputText.placeholder = '@nickname';
    inputText.required = true;
    inputText.autocomplete = 'off';
    inputText.id = 'playerName';
    this.add.dom(gameWidth / 2, gameHeight / 2, inputText);


    const button = document.createElement('button');
    button.id = 'savePlayer';
    button.innerText = 'Start';
    const startBtnObj = this.add.dom(gameWidth / 2, gameHeight / 2 + 50, button);
    startBtnObj.addListener('click');
    startBtnObj.on('click', () => {
      const plyrName = document.getElementById('playerName').value;
      if (plyrName) {
        gameDefaults.playerName = plyrName;
        this.scene.start('Game');
      }
    });
  }
}

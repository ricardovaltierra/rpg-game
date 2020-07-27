
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */

import 'phaser';
import config from '../config/config';
import Button from '../objects/Button';
import { load } from '../api/punctuationAPI';


export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    this.logo = this.add.image(400, 200, 'logo').setOrigin(0.5, 1.2);
    this.logo.scale = 0.5;

    // Game
    this.gameButton = new Button(this, config.width / 2, config.height / 2 - 70, 'redButton1', 'redButton2', 'Play', 'World');

    // Options
    this.optionsButton = new Button(this, config.width / 2, config.height / 2, 'redButton1', 'redButton2', 'Options', 'Options');

    // Credits
    this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 70, 'redButton1', 'redButton2', 'Credits', 'Credits');

    // Instructions
    this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 140, 'redButton1', 'redButton2', 'Instructions', 'Instructions');

    // Leaderboard
    this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 210, 'redButton1', 'redButton2', 'Leaderboard', 'Leaderboard');

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}
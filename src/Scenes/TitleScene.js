import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';


export default class TitleScene extends Phaser.Scene {
  constructor () {
    super('Title');
  }

  create () {
    
    // Game
    this.gameButton = new Button(this, config.width/2, config.height/2 - 200, 'redButton1', 'redButton2', 'Play', 'Game');

    // Options
    this.optionsButton = new Button(this, config.width/2, config.height/2 - 100, 'redButton1', 'redButton2', 'Options', 'Options');

    // Credits
    this.creditsButton = new Button(this, config.width/2, config.height/2, 'redButton1', 'redButton2', 'Credits', 'Credits');

    // Instructions
    this.creditsButton = new Button(this, config.width/2, config.height/2 + 100, 'redButton1', 'redButton2', 'Instructions', 'Instructions');

    // Leaderboard
    this.creditsButton = new Button(this, config.width/2, config.height/2 + 200, 'redButton1', 'redButton2', 'Leaderboard', 'Leaderboard');

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
};  
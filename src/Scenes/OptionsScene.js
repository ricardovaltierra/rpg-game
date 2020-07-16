import 'phaser';
import Button from '../Objects/Button';

export default class OptionsScene extends Phaser.Scene {
  constructor () {
    super('Options');
  }

  create () {
    this.logo = this.add.image(342, 35, 'logo').setOrigin(0, 0);
    this.logo.scale = 0.5;

    this.model = this.sys.game.globals.model;

    this.text = this.add.text(320, 200, 'Options', { fontSize: 35 });

    this.musicButton = this.add.image(300, 310, 'checkedBox');
    this.musicText = this.add.text(350, 300, 'Music Enabled', { fontSize: 20 });

    this.soundButton = this.add.image(300, 390, 'checkedBox');
    this.soundText = this.add.text(350, 380, 'Sound Enabled', { fontSize: 20 });

    this.musicButton.setInteractive();
    this.soundButton.setInteractive();

    this.musicButton.on('pointerdown', function () {  
      this.model.musicOn = !this.model.musicOn;
      this.updateAudio();
    }.bind(this));

    this.soundButton.on('pointerdown', function () {
      this.model.soundOn = !this.model.soundOn;
      this.updateAudio();
    }.bind(this));

    this.menuButton = new Button(this, 400, 500, 'redButton1', 'redButton2', 'Menu', 'Title');

    this.updateAudio();
  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.musicButton.setTexture('box').scale = 0.3;
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture('checkedBox').scale = 0.3;
      if (this.model.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        this.model.bgMusicPlaying = true;
      }
    }
  
    if (this.model.soundOn === false) {
      this.soundButton.setTexture('box').scale = 0.3;
    } else {
      this.soundButton.setTexture('checkedBox').scale = 0.3;
    }
  }
};
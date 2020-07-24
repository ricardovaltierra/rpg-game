import 'phaser';
import config from '../config/config';
import Button from '../objects/Button';
import { getPunctuation, resetPunctuation } from '../api/punctuation';
// import { postPunctuation } from '../api/punctuationApi';
// import { getPlayer } from '../api/user';

export default class GameOverScene extends Phaser.Scene {
  constructor () {
    super('GameOver');
  }

  preload () {
  }

  create () {
    this.logo = this.add.image(342, 35, 'logo').setOrigin(0, 0);
    this.logo.scale = 0.5;

    this.title = this.add.text(0,0, 'Game Over', { fontSize: '40px', fill: '#fff' });
    this.punctuation = this.add.text(0,0, `Punctuation ${getPunctuation()}`, { fontSize: '30px', fill: '#fff' });
    this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);

    Phaser.Display.Align.In.Center(this.title, this.zone);
    Phaser.Display.Align.In.Center(this.punctuation, this.zone);

    this.title.displayOriginY = 50;
    this.punctuation.displayOriginY = -50;

    // const player = getPlayer();
    // const finalPunctuation = getPunctuation();

    // postPunctuation(player, finalPunctuation);

    this.menuButton = new Button(this, 400, 500, 'redButton1', 'redButton2', 'Menu', 'Title');
    resetPunctuation();
  }
};
import 'phaser';
import config from '../config/config';
import Button from '../objects/Button';
import { getPunctuation, resetPunctuation } from '../api/punctuation';
import { postPunctuation } from '../api/punctuationAPI';
import { getPlayer } from '../api/player';


export default class WinnerScene extends Phaser.Scene {
  constructor () {
    super('Winner');
  }

  preload () {
  }

  create () {
    this.logo = this.add.image(342, 35, 'logo').setOrigin(0, 0);
    this.logo.scale = 0.5;

    this.title = this.add.text(0,0, 'The end of the travel', { fontSize: '40px', fill: '#fff' });
    this.messageText = this.add.text(
      0,0,
      'You have done a well job protecting Little Red Riding Hood on the forest',
      { fontSize: '25px', fill: '#fff', align: 'center', wordWrap: { width: 550, useAdvancedWrap: true } } );
  
    this.punctuation = this.add.text(0,0, `Punctuation ${getPunctuation()}`, { fontSize: '30px', fill: '#fff' });
    this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);

    Phaser.Display.Align.In.Center(this.title, this.zone);
    Phaser.Display.Align.In.Center(this.messageText, this.zone);
    Phaser.Display.Align.In.Center(this.punctuation, this.zone);

    this.title.displayOriginY = 50;
    this.messageText.displayOriginY = -15;
    this.punctuation.displayOriginY = -80;

    const player = getPlayer();
    const punctuation = getPunctuation();

    postPunctuation(player, punctuation);

    this.menuButton = new Button(this, 400, 500, 'redButton1', 'redButton2', 'Menu', 'Title');
    resetPunctuation();
  }
};
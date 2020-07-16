import 'phaser';
import config from '../Config/config';


export default class CreditsScene extends Phaser.Scene {
  constructor () {
    super('Credits');
  }

  create () {
    this.title = this.add.text(0, 0, 'Little Red Riding Hood', { fontSize: '32px', fontStyle: 'bold', fill: '#fff' });
    this.madeByText = this.add.text(0, 0, 'Created By: Ricardo Valtierra', { fontSize: '26px', fill: '#fff' });
    this.capstone = this.add.text(0, 0, 'Capstone project with Phaser 3 FW', { fontSize: '26px', fill: '#fff' });
    this.webpack = this.add.text(0, 0, 'ES6 and Webpack 3', { fontSize: '26px', fill: '#fff' });
    this.description = this.add.text(0, 0, 'Aknowledgments:', { fontSize: '26px', fontStyle: 'bold', fill: '#fff' });
    this.microverse = this.add.text(0, 0, 'Microverse', { fontSize: '20px', fill: '#fff' });
    this.phaser = this.add.text(0, 0, 'Phaser 3', { fontSize: '20px', fill: '#fff' });
    this.gamedev = this.add.text(0, 0, 'GameDev Academy', { fontSize: '20px', fill: '#fff' });
    this.gameart = this.add.text(0, 0, 'Open Game Art', { fontSize: '20px', fill: '#fff' });
    this.imageart = this.add.text(0, 0, 'deviantart - slimmmeiske2', { fontSize: '20px', fill: '#fff' });
    this.zone = this.add.zone(config.width/2, config.height/2, config.width, config.height);

    Phaser.Display.Align.In.Center(
      this.creditsText,
      this.zone
    );

    Phaser.Display.Align.In.Center(
      this.madeByText,
      this.zone
    );

    this.madeByText.setY(1000);

    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: -100,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete: function () {
        this.destroy;
      }
    });
     
    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: -300,
      ease: 'Power1',
      duration: 8000,
      delay: 1000,
      onComplete: function () {
        this.madeByTween.destroy;
        this.scene.start('Title');
      }.bind(this)
    });
  }
};
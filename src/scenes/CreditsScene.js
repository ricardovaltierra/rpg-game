/* eslint-disable no-undef */

import 'phaser';
import config from '../config/config';


export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    this.title = this.add.text(0, 0, 'Little Red Riding Hood', { fontSize: '32px', fontStyle: 'bold', fill: '#fff' });
    this.madeByText = this.add.text(0, 0, 'Created By: Ricardo Valtierra', { fontSize: '26px', fill: '#fff' });
    this.capstone = this.add.text(0, 0, 'Capstone project with Phaser 3 FW', { fontSize: '22px', fill: '#fff' });
    this.webpack = this.add.text(0, 0, 'ES6 and Webpack 3', { fontSize: '22px', fill: '#fff' });
    this.description = this.add.text(0, 0, 'Aknowledgments:', { fontSize: '22px', fontStyle: 'bold', fill: '#fff' });
    this.microverse = this.add.text(0, 0, 'Microverse', { fontSize: '22px', fill: '#fff' });
    this.phaser = this.add.text(0, 0, 'Phaser 3', { fontSize: '22px', fill: '#fff' });
    this.gamedev = this.add.text(0, 0, 'GameDev Academy', { fontSize: '22px', fill: '#fff' });
    this.gameart = this.add.text(0, 0, 'Open Game Art', { fontSize: '22px', fill: '#fff' });
    this.imageart = this.add.text(0, 0, 'deviantart - slimmmeiske2', { fontSize: '22px', fill: '#fff' });
    this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);

    const text = [this.title, this.madeByText, this.capstone, this.webpack, this.description,
      this.microverse, this.phaser, this.gamedev, this.gameart, this.imageart];
    const tweens = [];

    for (let i = 0; i < text.length; i += 1) {
      Phaser.Display.Align.In.Center(
        text[i],
        this.zone,
      );

      if (i === 0) {
        text[i].setY(60);
        this.tweens[i] = this.tweens.add({
          targets: text[i],
          y: -100,
          ease: 'Power1',
          duration: 3000,
          delay: 5000,
          onComplete() {
            this.destroy;
          },
        });
      } else {
        text[i].setY(60 + (i * 50));
      }
    }

    for (let i = 1; i < text.length; i += 1) {
      if (i < text.length - 1) {
        this.tweens[i] = this.tweens.add({
          targets: text[i],
          y: -100,
          ease: 'Power1',
          duration: 3000,
          delay: 5000 + (i * 1000),
          onComplete: function () {
            this.tweens[i].destroy;
          }.bind(this),
        });
      } else {
        this.tweens[i] = this.tweens.add({
          targets: text[i],
          y: -100,
          ease: 'Power1',
          duration: 3000,
          delay: 5000 + (i * 1000),
          onComplete: function () {
            this.tweens[i].destroy;
            this.scene.start('Title');
          }.bind(this),
        });
      }
    }
  }
}
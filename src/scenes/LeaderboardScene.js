/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */

import 'phaser';
import config from '../config/config';
import Button from '../objects/Button';
import { getPunctuations } from '../api/punctuationAPI';

function identPunctuation(size) {
  let dynamicSpacing = '';
  for (let i = 0; i < size; i++) {
    dynamicSpacing += ' ';
  }
  return dynamicSpacing;
}

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super('Leaderboard');
  }

  create() {
    this.logo = this.add.image(342, 5, 'logo').setOrigin(0, 0);
    this.logo.scale = 0.5;

    this.title = this.add.text(0, 0, 'Leaderboard', { fontSize: '32px', fontStyle: 'bold', fill: '#fff' });
    this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);

    Phaser.Display.Align.In.Center(
      this.title,
      this.zone,
    );

    this.title.displayOriginY = 135;

    getPunctuations().then(punctuations => {
      const buffer = [];
      let tempPlayer = '';
      let tempPunctuation = '';

      punctuations.map((user, i) => {
        tempPlayer = `# ${(i + 1).toString()} - ${user[0]}`;
        tempPunctuation = user[1].toString();

        buffer.push(
          `${tempPlayer} ${identPunctuation(66 - tempPlayer.length - tempPunctuation.length)} ${tempPunctuation}`,
        );

        return true;
      });

      const frame = this.add.graphics();
      frame.fillStyle(0x000000, 1);
      frame.fillRect(35, 193, 728, 250);


      const display = new Phaser.Display.Masks.GeometryMask(this, frame);

      const board = this.add.text(60, 210, buffer, { wordWrap: { width: 710 }, fill: '#fff' }).setOrigin(0);

      board.setMask(display);

      const zone = this.add.zone(35, 190, 728, 256).setOrigin(0).setInteractive();

      zone.on('pointermove', (pointer) => {
        if (pointer.isDown) {
          board.y += (pointer.velocity.y / 10);
          board.y = Phaser.Math.Clamp(board.y, -400, 300);
        }
      });
    });

    this.menuButton = new Button(this, 400, 500, 'redButton1', 'redButton2', 'Menu', 'Title');
  }
}

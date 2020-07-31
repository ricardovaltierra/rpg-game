
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */

import 'phaser';
import Button from '../objects/Button';


export default class InstructionsScene extends Phaser.Scene {
  constructor() {
    super('Instructions');
  }

  create() {
    const content = [
      ['   On the Forest  '],
      ['Little Red Riding Hood will move around the forest with your arrow keys. Each key',
        'moves her in the given direction as long as you press a key. Following the given',
        'route you willl not be able to see the enemies until a pop up window appear and',
        "shakes, that's when a new battle begins with your warriors to protect you.",
        ''],

      ['On the Battlefield'],
      ['Once you get here, you will be able to see your warriors on the right and the',
        'creatures on the left. The panel down them will show you the the menu, where',
        "you'll see every turn for you (each warrior) and then will select the creature",
        'to attack with that warrior. You can attack the same creature twice (one per),',
        'or different creatures one turn.',
        '',
        "After you finish, it's cretaures turn, where each one of them will attack.",
        '(also all of them are able to attack just one of your warriors, so',
        'watch your back!)',
        '',
        'The fight reach to end when one of the sides leaves with no characters. If you ',
        "win, you'll continue to the grandpa's house. Otherwise please leave your",
        'name for the record.'],
    ];

    for (let i = 0; i < content.length; i += 1) {
      if (i % 2 === 0) {
        this.add.text(320, 50 + (i * 65), content[i], {
          fontFamily: 'Arial', fontSize: '20px', fontStyle: 'bold', color: '#fff',
        });
      } else if (i === 1) {
        this.add.text(135, 10 + (i * 68), content[i], { fontFamily: 'Serif', color: '#fff', align: 'center' });
      } else {
        this.add.text(155, 10 + (i * 68), content[i], { fontFamily: 'Serif', color: '#fff', align: 'center' });
      }
    }

    this.menuButton = new Button(this, 400, 510, 'redButton1', 'redButton2', 'Menu', 'Title');
  }
}
/* eslint-disable no-undef */

import 'phaser';
// UI
import RedButton1 from '../assets/ui/buttonStock1.png';
import RedButton2 from '../assets/ui/buttonStock1h.png';
import BoxSelect from '../assets/ui/boxNormal.png';
import BoxNormal from '../assets/ui/boxSelect.png';
import MusicTheme from '../assets/TownTheme.mp3';
// map
import Tree from '../assets/map/tree.png';
import MapPiece from '../assets/map/map-piece.jpg';
import GrandPHouse from '../assets/map/grand-house.png';
// battlefield
import Landscape from '../assets/landscape.jpg';
// heroes
import LRRH from '../assets/$childRed.png';
import Knight1 from '../assets/knights/knight1.png';
import Knight2 from '../assets/knights/knight2.png';
// enemies
import Werewolf1 from '../assets/werewolfs/werewolf1.png';
import Werewolf2 from '../assets/werewolfs/werewolf2.png';
import Vampire1 from '../assets/vampires/vampire1.png';
import Vampire2 from '../assets/vampires/vampire2.png';
import Ghost1 from '../assets/ghosts/ghost1.png';
import Ghost2 from '../assets/ghosts/ghost2.png';
import Monster1 from '../assets/monsters/monster1.png';
import Monster2 from '../assets/monsters/monster2.gif';
import Wizard1 from '../assets/wizards/wizard1.png';
import Wizard2 from '../assets/wizards/wizard2.png';
import Witch1 from '../assets/witches/witch1.png';
import Witch2 from '../assets/witches/witch2.png';
import Zombie1 from '../assets/zombies/zombie1.png';
import Zombie2 from '../assets/zombies/zombie2.png';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    
    // add logo image
    this.logo = this.add.image(400, 200, 'logo').setOrigin(0.5, 1);
    this.logo.scale = 0.7;

    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load assets needed in our game
    this.load.image('redButton1', RedButton1);
    this.load.image('redButton2', RedButton2);

    this.load.image('box', BoxNormal);
    this.load.image('checkedBox', BoxSelect);
    this.load.audio('bgMusic', MusicTheme);


    // map
    this.load.image('map-piece', MapPiece);
    this.load.image('tree', Tree);
    this.load.image('grand-house', GrandPHouse);

    // battlefield
    this.load.image('forest-landscape', Landscape);
    // player
    this.load.spritesheet('player', LRRH, { frameWidth: 32, frameHeight: 32 });
    this.load.image('knight1', Knight1);
    this.load.image('knight2', Knight2);

    // enemies
    this.load.image('werewolf1', Werewolf1);
    this.load.image('werewolf2', Werewolf2);
    this.load.image('vampire1', Vampire1);
    this.load.image('vampire2', Vampire2);
    this.load.image('wizard1', Wizard1);
    this.load.image('wizard2', Wizard2);
    this.load.image('monster1', Monster1);
    this.load.image('monster2', Monster2);
    this.load.image('ghost1', Ghost1);
    this.load.image('ghost2', Ghost2);
    this.load.image('witch1', Witch1);
    this.load.image('witch2', Witch2);
    this.load.image('zombie1', Zombie1);
    this.load.image('zombie2', Zombie2);
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    this.scene.start('Title');
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
}
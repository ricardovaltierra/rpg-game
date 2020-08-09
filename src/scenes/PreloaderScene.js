/* eslint-disable no-undef */

import 'phaser';
// UI
// map

// battlefield

// heroes

// enemies

var music = [
  {
    key: 'bgMusic',
    url: '../../assets/TownTheme.mp3',
    config: {
      volume: 0.1,
      loop: true
    }
  },];

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
    this.load.image('redButton1', '../../assets/ui/buttonStock1.png');
    this.load.image('redButton2', '../../assets/ui/buttonStock1h.png');

    this.load.image('box', '../../assets/ui/boxSelect.png');
    this.load.image('checkedBox', '../../assets/ui/boxNormal.png');
    this.load.audio(music);

    // map
    this.load.image('map-piece', '../../assets/map/map-piece.jpg');
    this.load.image('tree', '../../assets/map/tree.png');
    this.load.image('grand-house', '../../assets/map/grand-house.png');

    // battlefield
    this.load.image('forest-landscape', '../../assets/landscape.jpg');
    // player
    this.load.spritesheet('player', '../../assets/$childRed.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('knight1', '../../assets/knights/knight1.png');
    this.load.image('knight2', '../../assets/knights/knight2.png');

    // enemies
    this.load.image('werewolf1', '../../assets/werewolfs/werewolf1.png');
    this.load.image('werewolf2', '../../assets/werewolfs/werewolf2.png');
    this.load.image('vampire1', '../../assets/vampires/vampire1.png');
    this.load.image('vampire2', '../../assets/vampires/vampire2.png');
    this.load.image('wizard1', '../../assets/wizards/wizard1.png');
    this.load.image('wizard2', '../../assets/wizards/wizard2.png');
    this.load.image('monster1', '../../assets/monsters/monster1.png');
    this.load.image('monster2', '../../assets/monsters/monster2.gif');
    this.load.image('ghost1', '../../assets/ghosts/ghost1.png');
    this.load.image('ghost2', '../../assets/ghosts/ghost2.png');
    this.load.image('witch1', '../../assets/witches/witch1.png');
    this.load.image('witch2', '../../assets/witches/witch2.png');
    this.load.image('zombie1', '../../assets/zombies/zombie1.png');
    this.load.image('zombie2', '../../assets/zombies/zombie2.png');
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
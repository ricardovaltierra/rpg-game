import 'phaser';
// import ZenvaLogo from '../assets/zenva_logo.png';
import Apple from '../assets/jabolko(red).png';

export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }

  preload () {
    this.load.image('logo', Apple);
  }
  
  create () {
    this.scene.start('Preloader');
  }
};
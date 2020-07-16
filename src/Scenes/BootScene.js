import 'phaser';
import ZenvaLogo from '../assets/zenva_logo.png';

export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }

  preload () {
    this.load.image('logo', ZenvaLogo);
  }
  
  create () {
    this.scene.start('Preloader');
  }
};
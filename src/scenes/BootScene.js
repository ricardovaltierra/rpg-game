import 'phaser';
import Apple from '../assets/jabolko(red).png';
import Grass from '../assets/map/map.jpg';

export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }

  preload () {
    this.load.image('logo', Apple);
    this.load.image('forest-grass', Grass);
  }
  
  create () {
    this.scene.start('Preloader');
  }
};
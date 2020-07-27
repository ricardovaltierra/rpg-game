/* eslint-disable no-undef */

import 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'screen-container',
  width: 800,
  height: 600,
  zoom: 1,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
};
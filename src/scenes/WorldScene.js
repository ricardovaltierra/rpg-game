/* eslint-disable no-undef */

import 'phaser';
import { getPunctuation } from '../api/punctuation';
import { BattleScene, UIScene } from './Battle';

export default class WorldScene extends Phaser.Scene {
  constructor() {
    super('World');
  }

  create() {
    this.add.tileSprite(118, 113, 2300, 2600, 'map-piece');

    this.trees = this.physics.add.staticGroup();

    // First tree row
    for (let i = 28; i < 800; i += 32) {
      for (let j = 200; j < 350; j += 18) {
        this.trees.create(i, j, 'tree').scale = 0.6;
      }
    }

    for (let i = 1000; i < 1200; i += 32) {
      for (let j = 200; j < 350; j += 18) {
        this.trees.create(i, j, 'tree').scale = 0.6;
      }
    }

    // Second tree row
    for (let i = 28; i < 210; i += 32) {
      for (let j = 600; j < 750; j += 18) {
        this.trees.create(i, j, 'tree').scale = 0.6;
      }
    }

    for (let i = 425; i < 1200; i += 32) {
      for (let j = 600; j < 750; j += 18) {
        this.trees.create(i, j, 'tree').scale = 0.6;
      }
    }

    // Third tree row
    for (let i = 28; i < 950; i += 42) {
      for (let j = 1000; j < 1150; j += 22) {
        this.trees.create(i, j, 'tree').scale = 0.6;
      }
    }

    for (let i = 1110; i < 1200; i += 42) {
      for (let j = 1000; j < 1150; j += 22) {
        this.trees.create(i, j, 'tree').scale = 0.6;
      }
    }

    this.endHouse = this.physics.add.staticImage(120, 1260, 'grand-house');
    this.endHouse.scale = 0.2;
    this.endHouse.flipX = true;

    this.player = this.physics.add.sprite(80, 70, 'player', 1);
    this.player.scale = 1.2;
    this.physics.world.bounds.width = 1218;
    this.physics.world.bounds.height = 1363;
    this.player.setCollideWorldBounds(true);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setBounds(0, 0, 1218, 1363);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { frames: [4, 3, 4, 5] }),
      frameRate: 7,
      repeat: -1,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { frames: [7, 6, 7, 8] }),
      frameRate: 7,
      repeat: -1,
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { frames: [10, 9, 10, 11] }),
      frameRate: 7,
      repeat: -1,
    });

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', { frames: [1, 0, 1, 2] }),
      frameRate: 7,
      repeat: -1,
    });

    this.physics.add.collider(this.player, this.trees);

    const group1 = this.add.zone(200, 100).setSize(100, 100);
    group1.name = 'group1';

    const group2 = this.add.zone(500, 150).setSize(100, 100);
    group2.name = 'group2';

    const group3 = this.add.zone(850, 110).setSize(100, 100);
    group3.name = 'group3';

    const group4 = this.add.zone(950, 350).setSize(100, 100);
    group4.name = 'group4';

    const group5 = this.add.zone(550, 480).setSize(100, 100);
    group5.name = 'group5';

    const group6 = this.add.zone(300, 860).setSize(100, 100);
    group6.name = 'group6';

    const group7 = this.add.zone(750, 850).setSize(100, 100);
    group7.name = 'group7';

    const group8 = this.add.zone(1000, 1100).setSize(100, 100);
    group8.name = 'group8';

    const group9 = this.add.zone(750, 1270).setSize(100, 100);
    group9.name = 'group9';

    const group10 = this.add.zone(490, 1270).setSize(100, 100);
    group10.name = 'group10';

    const group11 = this.add.zone(300, 1280).setSize(150, 150);
    group11.name = 'group11';

    [group1, group2,
      group3, group4,
      group5, group6,
      group7, group8,
      group9, group10,
      group11].map((group) => {
      this.physics.world.enable(group, 0);
      this.physics.add.overlap(this.player, group, this.onMeetEnemy, false, this);
      return true;
    });

    this.endZone = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
    this.endZone.create(120, 1260, 120, 120);
    this.physics.add.overlap(this.player, this.endZone, this.onReachHouse, false, this);

    this.textPunctuation = this.add.text(610, 5, `Punctuation: ${getPunctuation()}`, { fontSize: '16px', fill: '#fff' });
    this.textPunctuation.setScrollFactor(0, 0);

    this.sys.events.on('wake', this.wake, this);
  }

  wake() {
    this.textPunctuation.setText(`Punctuation: ${getPunctuation()}`);

    this.cursors.left.reset();
    this.cursors.right.reset();
    this.cursors.up.reset();
    this.cursors.down.reset();
  }

  onMeetEnemy(player, creatureType) {
    creatureType.x = 1200;
    creatureType.y = 800;

    this.playerX = this.player.x;
    this.playerY = this.player.y;

    // shake the world
    this.cameras.main.flash(300);
    this.cameras.main.shake(300);

    this.scene.add('BattleScene', BattleScene);
    this.scene.add('UIScene', UIScene);

    // start battle

    this.scene.sleep('World');
    this.scene.launch('BattleScene', { enemy: creatureType.name, y: this.player.y });
  }

  onReachHouse(player, zone) {
    zone.x = Phaser.Math.RND.between(0, 1218);
    zone.y = Phaser.Math.RND.between(0, 1363);

    this.cameras.main.flash(300);

    this.scene.start('Winner');
  }

  update() {
    this.player.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-100);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(100);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-100);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(100);
    }

    if (this.cursors.left.isDown) {
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.anims.play('right', true);
    } else if (this.cursors.up.isDown) {
      this.player.anims.play('up', true);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play('down', true);
    } else {
      this.player.anims.stop();
    }
  }
}
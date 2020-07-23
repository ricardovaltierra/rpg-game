import 'phaser';

export default class WorldScene extends Phaser.Scene {
  constructor () {
    super('World');
  }

  preload () {
  }

  create () {
    const map = this.add.tileSprite(118, 113, 2300, 2600, 'map-piece');

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

    this.player = this.physics.add.sprite(80,70, 'player', 1);
    this.player.scale = 1.2;
    this.physics.world.bounds.width = 1218;
    this.physics.world.bounds.height = 1363;
    this.player.setCollideWorldBounds(true);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setBounds(0,0, 1218, 1363);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { frames: [4, 3, 4, 5]}),
      frameRate: 7,
      repeat: -1,
    })

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

    this.spawns = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
    for(var i = 0; i < 50; i++) {
        var x = Phaser.Math.RND.between(0, 1218);
        var y = Phaser.Math.RND.between(0, 1363);
        // parameters are x, y, width, height
        this.spawns.create(x, y, 20, 20);            
    }        
    this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);

    this.sys.events.on('wake', this.wake, this);
  }

  wake() {
    this.cursors.left.reset();
    this.cursors.right.reset();
    this.cursors.up.reset();
    this.cursors.down.reset();
  }

  onMeetEnemy(player, zone) {        
    // we move the zone to some other location
    zone.x = Phaser.Math.RND.between(0, 1218);
    zone.y = Phaser.Math.RND.between(0, 1363);

    // shake the world
    this.cameras.main.shake(300);
    // this.cameras.main.fade(300);

    this.input.stopPropagation();
    // start battle 
    this.scene.switch('BattleScene');
  }

  update(time, delta) {
	  this.player.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown)
    {
      this.player.body.setVelocityX(-250);
    }
    else if (this.cursors.right.isDown)
    {
      this.player.body.setVelocityX(250);
    }

    // Vertical movement
    if (this.cursors.up.isDown)
    {
      this.player.body.setVelocityY(-250);
    }
    else if (this.cursors.down.isDown)
    {
      this.player.body.setVelocityY(250);
    }

    if (this.cursors.left.isDown)
    {
        this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown)
    {
        this.player.anims.play('right', true);
    }
    else if (this.cursors.up.isDown)
    {
        this.player.anims.play('up', true);
    }
    else if (this.cursors.down.isDown)
    {
        this.player.anims.play('down', true);
    }
    else
    {
        this.player.anims.stop();
    }
  }
};
import 'phaser';

export default class WorldScene extends Phaser.Scene {
  constructor () {
    super('World');
  }

  preload () {
  }

  create () {
    const map = this.add.image(450, 300, 'grass');

    this.trees = this.physics.add.staticGroup();

    for (let i = 20; i < 800; i += 32) {
      for (let j = 150; j < 200; j += 18) {
        const x = Phaser.Math.RND.between(20, 800);
        const y = Phaser.Math.RND.between(130, 220);
        this.trees.create(x, y, 'tree');
        this.trees.create(i, j, 'tree');
      }
    }

    for (let i = 100; i < 900; i += 32) {
      for (let j = 350; j < 400; j += 18) {
        const x = Phaser.Math.RND.between(100, 900);
        const y = Phaser.Math.RND.between(330, 420);
        this.trees.create(x, y, 'tree');
        this.trees.create(i, j, 'tree');
      }
    }

    for (let i = 20; i < 800; i += 42) {
      for (let j = 500; j < 525; j += 22) {
        const x = Phaser.Math.RND.between(20, 800);
        const y = Phaser.Math.RND.between(510, 530);
        this.trees.create(x, y, 'tree');
        this.trees.create(i, j, 'tree');
      }
    }

    this.overlapForest = this.physics.add.overlap(
      this.trees,
      false,
      this,
    );
  }
};
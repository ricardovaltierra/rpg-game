import 'phaser';

export default class Logo extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.image = this.scene.add.image(400, 200, key);
    this.image.scale = 0.5;

    this.add(this.image);

    this.scene.add.existing(this);
  }
}
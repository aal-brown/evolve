import Phaser from "phaser";
class Explosion extends Phaser.GameObjects.Sprite {
  
  constructor(scene, x, y) {
    super(scene, x, y, "explosion");
    scene.add.existing(this)
    this.tint = 0x00FF00;
    this.play("explosion_anim")
  }
}

export default Explosion;
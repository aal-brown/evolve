import Phaser from "phaser";
class Org extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y, iterations){
  super(scene, x, y, "blobs")

    this.age = iterations;
    this.reproductionCycle = 50;
    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    this.play("blobs_anim");
    scene.orgs.add(this);
  }
}
export default Org;
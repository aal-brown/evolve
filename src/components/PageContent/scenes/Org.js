import Phaser from "phaser";
class Org extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y, iterations, velX, velY){
  super(scene, x, y, "blobs")

    this.age = 0;
    this.reproductionCycle = 50;
    this.scale = 0.25;
    this.alpha = 1;

    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    this.play("blobs_anim");
    scene.orgs.add(this);
    this.body.setCollideWorldBounds(true);
    this.body.setBounce(1)
    this.body.velocity.x = velX;
    this.body.velocity.y = velY;
    
  }

  setVelocity(velX, velY){
    this.body.velocity.x = velX;
    this.body.velocity.y = velY;
  }

  resetSpeed() {
    this.setVelocity(Phaser.Math.Between(0, 100), Phaser.Math.Between(0, 100))
  }

  grow() {
    if (!(this.age % 250) && this.age <= 1000)  {
      this.scale+= 0.25
      this.setScale(this.scale)
    }
  } 

  dying(){
    this.alpha -= 0.25
    this.body.alpha = this.alpha
    this.scale -= 0.25
    this.setScale(this.scale)
  }
  destroy(){
    this.body.destroy();
  }
}
export default Org;
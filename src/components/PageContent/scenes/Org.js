import Phaser from "phaser";
import Game from "../Game";
class Org extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y, iterations, velX, velY){
  super(scene, x, y, "blobs")
    //this.attributes = genAttrVal
    //this.lifespan = 
    //this.speed
    //this.strength
    //this.energy efficiency
    //this.max_energy
    //this.agression
    //this.health
    //this.type
    //this.predator
    //this.name
    //this.perception
    //this.litter_size
    //this.breeding_age
    //this.score
    //this.status?
    //this.target?
    //this.generation

    //this.flatener
    //this.parent1
    //this.parent2

    this.age = 0;
    this.reproductionCycle = 50;
    this.eatCycle = 1000;
    this.scale = 0.25;
    this.energy = 2000;
    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    this.play("blobs_anim");
    scene.orgs.add(this);
    this.body.setCollideWorldBounds(true);
    this.body.setBounce(1);
    this.body.velocity.x = velX;
    this.body.velocity.y = velY;

    this.tint = Math.random() * 0xffffff;
  }

  //Check the distance between org and all other elements, (based on what is passed in), if this distance is less than perception than return true. Else return false.
  distanceBetweenPerceived(a,b,perception) {
    a.distanceBetween()
    //game.physics.arcade.distanceBetween
    //get angle between as well
    //then the x and y speeds should be adjusted based on the angle
  }

  search(energy, health, type, age) {
    //if energy < 50% or if health is low, and mate not in perception distance
  }

  movement(speed) {
    //part of search algorithm
  }

  genAttrValue(parent1,parent2, flatness) {
    //could return an array with all attributes?
  }

  setVelocity(velX, velY) {
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

  dying() {
    //console.log("AHH IM DYING")
    this.alpha -= 0.25
    this.scale -= 0.25
    this.setScale(this.scale)
  }

}
export default Org;
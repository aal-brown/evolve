import Phaser from "phaser";
import Game from "../Game";
var gaussian = require('gaussian');

class Org extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, parent1, parent2) {
    super(scene, x, y, "blobs")
    function mathNormInherited(v1, v2){
      let mean = avg(v1, v2)
      let distribution = gaussian(mean, 2);
      // Take a random sample using inverse transform sampling method.
     return Math.floor(distribution.ppf(Math.random()));
    }
    function mathNorm(mean, variance){
      let distribution = gaussian(mean, variance);
      // Take a random sample using inverse transform sampling method.
     return Math.floor(distribution.ppf(Math.random()));
    }
    function avg(n1, n2){
      return ((n1 + n2)* 0.5)
    }
    if (parent1 && parent2) {
      this.lifespan = mathNormInherited(parent1.lifespan, parent2.lifespan)
      this.velx = mathNormInherited(parent1.velx, parent2.velx)
      this.vely = mathNormInherited(parent1.vely, parent2.vely)
      this.strength = mathNormInherited(parent1.strength, parent2.strength)
      this.energy_efficiency = mathNormInherited(parent1.energy_efficiency, parent2.energy_efficiency)
      this.max_energy = mathNormInherited(parent1.max_energy, parent2.max_energy)
      this.agression = mathNormInherited(parent1.agression, parent2.agression)
      this.health = mathNormInherited(parent1.health, parent2.health)
      if(parent1.predator && parent2.predator){
        this.predator = true
      } else if (!parent1.predator && !parent2.predator){ 
        this.predator = false
      } else {
      const val = Phaser.Math.Between(0, 1)
      this.predator = val === 0 ? true : false
      }
      this.perception = mathNormInherited(parent1.perception, parent2.perception)
      this.litter_size = mathNormInherited(parent1.litter_size, parent2.litter_size)
      this.breeding_age = mathNormInherited(parent1.breeding_age, parent2.breeding_age)
      
      this.generation = parent1.generation + 1
      this.parent1 = parent1
      this.parent2 = parent2
      
    } else {
      this.lifespan = mathNorm(Phaser.Math.Between(0, 1000), 2)
      this.velx = mathNorm(Phaser.Math.Between(-50, 50), 2)
      this.vely = mathNorm(Phaser.Math.Between(-50, 50), 2)
      this.strength = mathNorm(Phaser.Math.Between(0, 100), 2)
      this.energy_efficiency = mathNorm(Phaser.Math.Between(0, 100), 2)
      this.max_energy = mathNorm(Phaser.Math.Between(0, 100), 2)
      this.agression = mathNorm(Phaser.Math.Between(0, 100), 2)
      this.health = mathNorm(Phaser.Math.Between(0, 100), 2)
      const val = Phaser.Math.Between(0, 1)
      this.predator = val === 0 ? true : false
      this.perception = mathNorm(Phaser.Math.Between(0, 50), 2)
      this.litter_size = mathNorm(Phaser.Math.Between(0, 50), 2)
      this.breeding_age = mathNorm(Phaser.Math.Between(0, 50), 2)
      
      this.generation = 1
      this.parent1 = null
      this.parent2 = null
    }
    //this.attributes = genAttrVal
    
    //this.type
    
    //this.name
    
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
    this.body.velocity.x = this.velx;
    this.body.velocity.y = this.vely;

    this.tint = Math.random() * 0xffffff;
  }

  //Check the distance between org and all other elements, (based on what is passed in), if this distance is less than perception than return true. Else return false.
  distanceBetweenPerceived(b, perception) {
    let dist = Phaser.Math.Distance.Between(this.x, this.y,b.x, b.y)
    return dist < this.perception
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

  genAttrValue(parent1, parent2, flatness) {
    //could return an array with all attributes?
  }

  setVelocity(velx, vely) {
    this.body.velocity.x = velx;
    this.body.velocity.y = velx;
  }

  resetSpeed() {
    this.setVelocity(Phaser.Math.Between(0, 100), Phaser.Math.Between(0, 100))
  }

  grow() {
    if (!(this.age % 250) && this.age <= 1000) {
      this.scale += 0.25
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
import Phaser from "phaser";
const gaussian = require('gaussian');

class Org extends Phaser.GameObjects.Sprite {

  constructor(scene, x, y, parent1, parent2, orgNum) {
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

    function avg(n1, n2) {
      return ((n1 + n2)* 0.5)
    }
    if (parent1 && parent2) {
      this.lifespan = mathNormInherited(parent1.lifespan, parent2.lifespan)
      this.velx = mathNormInherited(parent1.velx, parent2.velx)
      this.vely = mathNormInherited(parent1.vely, parent2.vely)
      this.strength = mathNormInherited(parent1.strength, parent2.strength)
      this.energy_efficiency = mathNormInherited(parent1.energy_efficiency, parent2.energy_efficiency)
      this.max_energy = mathNormInherited(parent1.max_energy, parent2.max_energy)
      this.aggression = mathNormInherited(parent1.aggression, parent2.aggression)
      this.max_health = mathNormInherited(parent1.health, parent2.health)
      this.health = this.max_health
      this.speed = mathNormInherited(parent1.speed, parent2.speed)
      
      if(parent1.predator && parent2.predator){
        this.predator = true
      } else if (!parent1.predator && !parent2.predator){ 
        this.predator = false
      } else {
        const val1 = Phaser.Math.Between(0, 1)
        this.predator = (val1 === 0 ? true : false)
      }
      if(parent1.type === 1 && parent2.type === 1){
        this.type = 1
      } else if (parent1.type === 2 && parent2.type === 2){ 
        this.type = 2
      } else {
        const val2 = Phaser.Math.Between(1, 2)
        this.type = (val2 === 1 ? 1 : 2)
      }
      this.perception = mathNormInherited(parent1.perception, parent2.perception)
      const inheritedLitterVal = mathNormInherited(parent1.litter_size, parent2.litter_size)
      this.litter_size = (inheritedLitterVal <= 0 ? 1 : inheritedLitterVal)
      this.breeding_age = mathNormInherited(parent1.breeding_age, parent2.breeding_age)
      
      this.generation = parent1.generation + 1
      this.parent1 = parent1
      this.parent2 = parent2
      
    } else {
      this.lifespan = mathNorm(2500, 100000)
      this.velx = mathNorm(Phaser.Math.Between(-50, 50), 2)
      this.vely = mathNorm(Phaser.Math.Between(-50, 50), 2)
      this.strength = mathNorm(75, 200)
      this.energy_efficiency = mathNorm(75, 750)
      this.max_energy = mathNorm(800, 8000)
      this.aggression = mathNorm(75, 200)
      this.max_health = mathNorm(500, 20000)
      this.health = this.max_health
      const val1 = Phaser.Math.Between(0, 1)
      this.predator = (val1 === 0 ? true : false)
      this.perception = mathNorm(350, 4000)
      const litterRand = mathNorm(3, 2)
      this.litter_size = (litterRand <= 0 ? 1 : litterRand)
      this.breeding_age = mathNorm(500, 5000)
      this.speed = mathNorm(100, 2000)
      const val2 = Phaser.Math.Between(1, 15)
      if (val2 <= 5 ) {
        this.type = 2
      } else {
        this.type = 1
      }
      // this.type = (val2 === 1 ? 1 : 2)
      
      this.generation = 1
      this.parent1 = {id:0}
      this.parent2 = {id:0}
    }
    //this.attributes = genAttrVal
    
    //this.type
    
    //this.name
    
    //this.score
    //this.status?
    //this.target?
    //this.generation

    //this.flatener


    this.id = orgNum;
    this.age = 0;
    this.score = this.getScore()
    this.reproductionCycle = 100;
    //this.eatCycle = 20;
    this.scale = 0.25;
    this.energy = this.max_energy;
    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    this.play("blobs_anim");
    scene.orgs.add(this);
    this.body.setCollideWorldBounds(true);
    this.body.setBounce(1);
    this.body.velocity.x = this.velx;
    this.body.velocity.y = this.vely;
    this.colour = Math.random() * 0xffffff;

    this.tint = this.colour;
  }

  //Check the distance between org and all other elements, (based on what is passed in), if this distance is less than perception than return true. Else return false.
  distanceBetweenPerceived(b) {
    let dist = Phaser.Math.Distance.Between(this.body.x, this.body.y, b.x, b.y)
    return dist < this.perception
    //game.physics.arcade.distanceBetween
    //get angle between as well
    //then the x and y speeds should be adjusted based on the angle
  }

  search(energy, health, type, age) {
    //if energy < 50% or if health is low, and mate not in perception distance
  }

  getScore() {
    let score = (
      (this.lifespan/2500)*200 + 
      // (this.strength/75)*100 +
      (this.energy_efficiency/75)*100 +
      (this.max_energy/800)*100 +
      // (this.aggression/75)*100 +
      (this.health/500)*100 +
      (this.perception/350)*120 +
      (this.litter_size/6)*100 +
      // (this.breeding_age/500)*100 +
      (this.speed/100)*200
    );
    return Math.ceil(score)
  }

  movement(speed) {
    //part of search algorithm
  }

  genAttrValue(parent1, parent2, flatness) {
    //could return an array with all attributes?
  }

  setVelocity(velx, vely) {
    this.body.velocity.x = velx;
    this.body.velocity.y = vely;
  }

  resetSpeed() {
    this.setVelocity(Phaser.Math.Between(0, 100), Phaser.Math.Between(0, 100))
  }

  grow(value) {
    if (!(this.age % 100) && this.age <= 450) {
      this.scale += value
      this.setScale(this.scale)
    }
  }
  shrink(value) {
      this.scale -= value
      this.setScale(this.scale)
  }

  dying() {
    //console.log("AHH IM DYING")
    this.alpha -= 0.25
    this.scale -= 0.25
    this.setScale(this.scale)
  }

  getAttributes() {
    let orgAttributes = {
      orgNum: this.id,
      age: this.age,
      score: this.score,
      reproductionCycle: this.reproductionCycle,
      eatCycle: this.eatCycle,
      scale: this.scale,
      energy: this.energy,
      velx: this.velx,
      vely: this.vely,
      colour: this.colour,
      lifespan: this.lifespan,
      strength: this.strength,
      energy_efficiency: this.energy_efficiency,
      max_energy: this.max_energy,
      aggression: this.aggression,
      health: this.health,
      predator: this.predator,
      perception: this.perception,
      litter_size: this.litter_size,
      breeding_age: this.breeding_age,
      speed: this.speed,
      type: this.type,
      generation: this.generation,
      parent1: this.parent1.id,
      parent2: this.parent2.id
    };

    return orgAttributes;
  }


}
export default Org;
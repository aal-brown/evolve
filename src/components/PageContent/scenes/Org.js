import Phaser from "phaser";
const gaussian = require('gaussian');

class Org extends Phaser.GameObjects.Sprite {

  constructor(scene, x, y, parent1, parent2, orgNum) {
    super(scene, x, y, "gb")
    
    function mathNormInherited(v1, v2, stdev){
      let mean = avg(v1, v2)
      let distribution = gaussian(mean, stdev);
      // Take a random sample using inverse transform sampling method.
     return Math.abs(Math.floor(distribution.ppf(Math.random())));
    }

    function mathNorm(mean, variance){
      let distribution = gaussian(mean, variance);
      // Take a random sample using inverse transform sampling method.
     return Math.abs(Math.floor(distribution.ppf(Math.random())));
    }

    function avg(n1, n2) {
      return ((n1 + n2)* 0.5)
    }
    if (parent1 && parent2) {
      this.speed = mathNormInherited(parent1.speed, parent2.speed, 1000)
      this.lifespan = mathNormInherited(parent1.lifespan, parent2.lifespan, 100000)
      this.strength = mathNormInherited(parent1.strength, parent2.strength, 200)
      this.energy_efficiency = mathNormInherited(parent1.energy_efficiency, parent2.energy_efficiency, 750)
      this.max_energy = mathNormInherited(parent1.max_energy, parent2.max_energy, 8000)
      this.aggression = mathNormInherited(parent1.aggression, parent2.aggression, 200)
      this.max_health = mathNormInherited(parent1.health, parent2.health, 10000)
      this.health = this.max_health
      
      
      if(parent1.predator && parent2.predator){
        this.predator = true
      } else if (!parent1.predator && !parent2.predator){ 
        this.predator = false
      } else {
        const val1 = Phaser.Math.Between(0, 10)
        this.predator = (val1 === 0 ? true : false)
      }
      if(parent1.sex === 1 && parent2.sex === 1){
        this.sex = 1
      } else if (parent1.sex === 2 && parent2.sex === 2){ 
        this.sex = 2
      } else {
        const val2 = Phaser.Math.Between(1, 2)
        this.sex = (val2 === 1 ? 1 : 2)
      }
      this.perception = mathNormInherited(parent1.perception, parent2.perception, 4000)
      const inheritedLitterVal = mathNormInherited(parent1.litter_size, parent2.litter_size, 2)
      this.litter_size = (inheritedLitterVal <= 0 ? 1 : inheritedLitterVal)
      if (this.litter_size > 7) {
        this.litter_size = 7
      }
      this.breeding_age = mathNormInherited(parent1.breeding_age, parent2.breeding_age, 100)
      
      this.generation = parent1.generation + 1
      this.parent1 = parent1.id
      this.parent2 = parent2.id
      
    } else {
      this.lifespan = mathNorm(2500, 100000)
      this.speed = mathNorm(100, 1000)
     
      this.strength = mathNorm(75, 200)
      this.energy_efficiency = mathNorm(75, 750)
      this.max_energy = mathNorm(800, 8000)
      this.aggression = mathNorm(75, 200)
      this.max_health = mathNorm(500, 20000)
      this.health = this.max_health
      const val1 = Phaser.Math.Between(0, 10)
      this.predator = (val1 === 0 ? true : false)
      this.perception = mathNorm(350, 4000)
      const litterRand = mathNorm(3, 2)
      this.litter_size = (litterRand <= 0 ? 1 : litterRand)
      if (this.litter_size > 7) {
        this.litter_size = 7
      }
      this.breeding_age = mathNorm(500, 5000)
      
      const val2 = Phaser.Math.Between(1, 15)
      if (val2 <= 5 ) {
        this.sex = 2
      } else {
        this.sex = 1
      }
      // this.sex = (val2 === 1 ? 1 : 2)

      this.generation = 1
      this.parent1 = 0
      this.parent2 = 0
    }

    this.ageless = false;
    this.invincible = false;
    this.velx = Phaser.Math.Between(-this.speed, this.speed)
    this.vely = Math.sqrt((this.speed**2) - (this.velx**2))*(-1)**(Math.floor(Phaser.Math.Between(0,1)))
    this.id = orgNum;
    this.age = 0;
    this.score = this.getScore()
    this.reproductionCycle = 100;
    //this.eatCycle = 20;
    this.scale = 0.25;
    this.energy = this.max_energy;
    scene.add.existing(this);
    scene.physics.world.enableBody(this);

    if(this.sex === 1) {
        this.play("bb_anim");
        this.setTexture("bb")
    } else {
      this.play("gb_anim");
      this.setTexture("gb")
    }

    scene.orgs.add(this);
    this.body.setCollideWorldBounds(true);
    this.body.setBounce(0.1);
    this.body.velocity.x = this.velx;
    this.body.velocity.y = this.vely;
    this.body.damping = 0;
    this.colour = this.score * 0xffffff;
    this.status = "Wandering"
    this.tint = this.colour;
    this.isShowingDamage = false;
    this.speedBoost = 51;
    this.damageCycle = 400;
    this.predBool = true;
  }

  //Check the distance between org and all other elements, (based on what is passed in), if this distance is less than perception than return true. Else return false.
  distanceBetweenPerceived(b) {
    let dist = Phaser.Math.Distance.Between(this.body.x, this.body.y, b.x, b.y)
    return dist < this.perception
  }

  search(energy, health, sex, age) {
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
    this.velx = Phaser.Math.Between(-this.speed, this.speed)
    this.vely = Math.sqrt((this.speed**2) - (this.velx**2))*(-1)**(Math.floor(Phaser.Math.Between(0,1)))
    this.setVelocity(this.velx, this.vely)
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
  damage(){
    this.setTexture("damage")
    this.play("damage_anim")
  }

  getAttributes() {
    let orgAttributes = {
      org_status: this.status,
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
      sex: this.sex,
      generation: this.generation,
      invincible: this.invincible,
      ageless: this.ageless,
      parent1: this.parent1,
      parent2: this.parent2,
      xcoord: this.body.x,
      ycoord: this.body.y,
    };

    return orgAttributes;
  }


}
export default Org;
import Phaser from "phaser";
import Org from "./Org";
import Food from "./Food";
import axios from "axios";

let iterations = 0;

class TitleScene extends Phaser.Scene {

  constructor() {
    super('TitleScene')
  }

  async create() {

    const foodData = await this.getFoodData();
    console.log("inside the create func ", foodData);

    // axios.get("http://localhost:3000/foods")
    // .then((res) => {
    //   foodsData = res.data
    //   console.log("inside TitleScene", foodsData)})
    // .catch((err) => console.log(err.message));
    // this.gameTime = new Phaser.Timer(this);

    //===========================================Organisms====================================================

    this.add.image(400, 300, 'sky');
    this.orgs = this.physics.add.group();
   

    this.r1 = new Org(this, 400, 200, iterations, 50, 60)
    this.r2 = new Org(this, 400, 400, iterations, 100, 100)
    this.r3 = new Org(this, 400, 600, iterations, 25, 35)
    this.r4 = new Org(this, 200, 400, iterations, 10, 20)
    this.r5 = new Org(this, 400, 400, iterations, 20, 30)
    this.r6 = new Org(this, 600, 400, iterations, 3, 4)

    this.physics.add.overlap(this.orgs, this.orgs, this.spawn, null, this);

    this.physics.add.overlap(this.orgs, this.foods, this.eat, null, this);

    //============================================Foods=======================================================
    this.foods = this.physics.add.group();
    this.f1 = new Food(this, Phaser.Math.Between(20,580), Phaser.Math.Between(20,780), foodData[Phaser.Math.Between(1, 5)])
    this.f2 = new Food(this, Phaser.Math.Between(20,580), Phaser.Math.Between(20,780), foodData[Phaser.Math.Between(1, 5)])
    this.f3 = new Food(this, Phaser.Math.Between(20,580), Phaser.Math.Between(20,780), foodData[Phaser.Math.Between(1, 5)])
    this.f4 = new Food(this, Phaser.Math.Between(20,580), Phaser.Math.Between(20,780), foodData[Phaser.Math.Between(1, 5)])
    this.f5 = new Food(this, Phaser.Math.Between(20,580), Phaser.Math.Between(20,780), foodData[Phaser.Math.Between(1, 5)])

  }

  update() {
    if(this.orgs){
      for(let i = 0; i < this.orgs.getChildren().length; i++){
        let org = this.orgs.getChildren()[i]
        org.reproductionCycle++;
        org.age++;
        if (org.energy > 0) {
          org.energy--;
        }
        org.grow();
        org.body.velocityX = (org.body.velocityX * org.energy/2000)
        org.body.velocityY = (org.body.velocityY * org.energy/2000)
        console.log(org.energy)
        if (!org.age % 600) {
          org.tint = org.tint * 0.5;
        }

        if(org.age > 2000) {
          org.tint = 0.001 * 0xffffff;
          org.setVelocity(0,0);
          this.orgs.remove(org, false, false)
          this.dyingOrg(org);
        }
      }
        for(let i = 0; i < this.foods.getChildren().length; i++){
          let food = this.foods.getChildren()[i]

          if(food.energy === 0) {
            food.destroy();
          }

      iterations++;
        }
   }
  }

  getFoodData = async function() {
    return axios.get("http://localhost:3000/foods")
      .then((res) => {
        console.log("inside TitleScene", res.data)
        return res.data;
      })
      .catch((err) => console.log(err.message));
  }

  spawn(org1, org2) {
    if(org1.age > 500 && org2.age > 500 && org1.reproductionCycle >= 300 && org2.reproductionCycle >= 300){

      const randomX = Phaser.Math.Between(-5, 5)
      const randomY = Phaser.Math.Between(-5, 5)
      const velX = Phaser.Math.Between(0, 100)
      const velY = Phaser.Math.Between(0, 100)

      let newOrg = new Org(this, org1.x + randomX, org1.y + randomY, iterations, velX, velY)
      org1.reproductionCycle = 0;
      org2.reproductionCycle = 0;
      org1.setVelocity(0,0);
      org2.setVelocity(0,0);

      this.time.addEvent({
        delay: 1000,
        callback: function(){
          org1.resetSpeed();
          org2.resetSpeed();
        },
        callbackScope: this,
        loop: false
      })
    }
  }

eat(org, food) {

  if (food.energy > 15) {
    org.energy += 15
    food.energy -= 15
  } else if (food.energy <= 15 && food.energy > 0) {
    org.energy += food.energy
    food.energy = 0
  }
}

 dyingOrg(org){
    //console.log("Hey I'm in here")
    this.time.addEvent({
      delay: 1000,
      callback: function(){
        org.dying();

        if(org.scale <= 0){
          org.destroy();
        }
      },
      callbackScope: this,
      repeat: 6
    });
  }

}

export default TitleScene;
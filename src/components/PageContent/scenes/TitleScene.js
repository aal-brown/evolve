import Phaser from "phaser";
import Org from "./Org";
import Food from "./Food";
import axios from "axios";


class TitleScene extends Phaser.Scene {

  constructor() {
    super('TitleScene')
  }

  async create() {
   this.pausePhysics = false;
    const foodData = await this.getFoodData();
    console.log("inside the create func ", foodData);
  
    // axios.get("http://localhost:3000/foods")
    // .then((res) => {
    //   foodsData = res.data
    //   console.log("inside TitleScene", foodsData)})
    // .catch((err) => console.log(err.message));
    // this.gameTime = new Phaser.Timer(this);


    //Create a black strip at the top of the screen.

    //===========================================Organisms====================================================

    //this.add.image(400, 300, 'sky');

    this.orgs = this.physics.add.group();
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    if (Phaser.Input.Keyboard.JustDown(this.spacebar) && this.pausePhysics === false) {
    
      // Physics becomes active
      this.pausePhysics = true;
  
      // Pause `Physics`
      this.physics.pause ( );
  
    } else {
      // Set `Physics` variable back to `off`
      this.pausePhysics = false;
      this.physics.resume();
    }

    this.r1 = new Org(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), null, null)
    this.r2 = new Org(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), null, null)
    this.r3 = new Org(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), null, null)
    this.r4 = new Org(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), null, null)
    this.r5 = new Org(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), null, null)
    this.r6 = new Org(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), null, null)

    this.physics.add.overlap(this.orgs, this.orgs, this.spawn, null, this);
    this.physics.add.collider(this.orgs, this.partitions);

    //============================================Foods=======================================================
    this.foods = this.physics.add.group();
    this.f1 = new Food(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), foodData[Phaser.Math.Between(1, 5)])
    this.f2 = new Food(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), foodData[Phaser.Math.Between(1, 5)])
    this.f3 = new Food(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), foodData[Phaser.Math.Between(1, 5)])
    this.f4 = new Food(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), foodData[Phaser.Math.Between(1, 5)])
    this.f5 = new Food(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), foodData[Phaser.Math.Between(1, 5)])

    this.physics.add.overlap(this.orgs, this.foods, this.eat, null, this);

  //================= buttons ==============================================//
    const htmlForm = this.add
    .dom(350, 300)
    .createFromCache("buttons");

    htmlForm.addListener("click");
    // Have it setup so a random word gets set as server name
    htmlForm.on("click", function(event) {
      if (event.target.name === "addOrg") {
        this.scene.addOrg();
      } else if (event.target.name === "addFood") {
        this.scene.addFood(foodData);
      }
    })

    // this.checkClosestMoveTo(this.orgs.getChildren()[0], this.foods.getChildren())
  }

  update() {
    if(this.orgs){
      for(let i = 0; i < this.orgs.getChildren().length; i++){
        let org = this.orgs.getChildren()[i]
        if(this.foods.getChildren().length > 0) {
          this.checkClosestMoveTo(org,this.foods.getChildren())
        }
        org.reproductionCycle++;
        org.age++;
        org.eatCycle++;
        if (org.energy > 0) {
          org.energy--;
        }
        org.grow();
        org.body.velocityX = (org.body.velocityX * org.energy/2000)
        org.body.velocityY = (org.body.velocityY * org.energy/2000)
        
        // if (!org.age % 600) {
        //   org.tint = org.tint * 0.5;
        // }

        if(org.age > 2000) {
          org.tint = 0.001 * 0xffffff;
          org.setVelocity(0,0);
          this.orgs.remove(org, false, false)
          this.dyingOrg(org);
        }
      }
        for(let i = 0; i < this.foods.getChildren().length; i++){
          let food = this.foods.getChildren()[i]

          if(food.energy <= 0) {
            console.log("food destroy")
            food.destroy();
          }
      
      

        }
    }
  }

  checkClosestMoveTo(source,objects) {
    //console.log("org",source)
    source.setScale(2)
    let closest = this.physics.closest(source,objects)
    console.log("distance", Phaser.Math.Distance.Between(source.x, source.y,closest.x, closest.y))
    //this.physics.moveTo()
    //console.log(closest)
    this.physics.moveToObject(source,closest,90)
  }

  addOrg() {
    new Org(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), Phaser.Math.Between(0, 100), Phaser.Math.Between(0, 100), null, null)
  }

  addFood(foodData) {
    new Food(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), foodData[Phaser.Math.Between(1, 5)])
  }
  
  getFoodData = async function() {
    return axios.get("http://localhost:3000/foods")
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err.message));
  }

  spawn(org1, org2,) {
    if(org1.age > 500 && org2.age > 500 && org1.reproductionCycle >= 300 && org2.reproductionCycle >= 300){

      const randomX = Phaser.Math.Between(-5, 5)
      const randomY = Phaser.Math.Between(-5, 5)

      let newOrg = new Org(this, org1.x + randomX, org1.y + randomY, org1, org2)
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
    if (food.energy > 15 && org.eatCycle > 350) {
      org.energy += 15
      food.energy -= 15
      org.eatCycle = 0;
    } else if (food.energy <= 15 && food.energy > 0 && org.eatCycle > 350) {
      org.energy += food.energy
      org.eatCycle = 0;
      food.energy = 0;
    }
  }

 dyingOrg(org){
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
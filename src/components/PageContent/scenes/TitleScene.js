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
    
    this.newGame = true;
    if(!this.newGame) {
      this.gameID = await this.getGameID(); //eventually implement so we can load saved games
    } else {
      this.gameID = null;
    }
    
    console.log("inside the create func ", foodData);
    
    // axios.get("http://localhost:3000/foods")
    // .then((res) => {
    //   foodsData = res.data
    //   console.log("inside TitleScene", foodsData)})
    // .catch((err) => console.log(err.message));
    // this.gameTime = new Phaser.Timer(this);


    //Create a black strip at the top of the screen.

    //=========================================================pause================================================

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    if (Phaser.Input.Keyboard.JustDown(this.spacebar) && this.pausePhysics === false) {
    
      // Physics becomes active
      this.pausePhysics = true;
  
      // Pause `Physics`
      this.physics.pause();
  
    } else {
      // Set `Physics` variable back to `off`
      this.pausePhysics = false;
      this.physics.resume();
    }

    //===========================================Organisms====================================================

    this.background = this.add.image(400, 300, 'sky');

    this.orgs = this.physics.add.group();
   
    //Organisms on-click
    this.input.on("gameobjectdown", this.writeAttributes);

    this.r1 = new Org(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), null, null)
    this.r2 = new Org(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), null, null)
    this.r3 = new Org(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), null, null)
    this.r4 = new Org(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), null, null)
    this.r5 = new Org(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), null, null)
    this.r6 = new Org(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), null, null)
    this.orgNum = 6;
  
    this.r1.setInteractive()
    this.r2.setInteractive()
    this.r3.setInteractive()
    this.r4.setInteractive()
    this.r5.setInteractive()
    this.r6.setInteractive()

    this.physics.add.overlap(this.orgs, this.orgs, this.spawn, null, this);
    this.physics.add.collider(this.orgs, this.partitions);

    //============================================Foods=======================================================
    this.foods = this.physics.add.group();
    this.f1 = new Food(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), foodData[Phaser.Math.Between(0, 4)])
    this.f2 = new Food(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), foodData[Phaser.Math.Between(0, 4)])
    this.f3 = new Food(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), foodData[Phaser.Math.Between(0, 4)])
    this.f4 = new Food(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), foodData[Phaser.Math.Between(0, 4)])
    this.f5 = new Food(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), foodData[Phaser.Math.Between(0, 4)])

    this.physics.add.overlap(this.orgs, this.foods, this.eat, null, this);

  //============================================================== left sidebar ==============================================//
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
      } else if (event.target.name === "save") {
        this.scene.onSave(this.newGame);
      }
    })

  //============================================================== Right sidebar ==============================================//  
  // const rightSidebar = this.add
  // .dom(1500, 300)
  // .createFromCache("right-sidebar");
  // console.log(rightSidebar.parent.insertAdjacentText(name="orgID"))

  // rightSidebar.addListener("click");
  // Have it setup so a random word gets set as server name
  // htmlForm.on("click", function(event) {
  //   if (event.target.name === "addOrg") {
  //     this.scene.addOrg();
  //   } else if (event.target.name === "addFood") {
  //     this.scene.addFood(foodData);
  //   }
  // })
  //this.rightsidebar = 0;
  this.background.setInteractive();
  }
  
  consoleLog(pointer, gameObject ) {
    console.log(gameObject.id)
  }

  writeAttributes(pointer, gameObject) {
    console.log(gameObject instanceof Org)
  if(!(gameObject instanceof Org) && this.rightsidebar) {
    this.rightsidebar.destroy()
    return
  } else if (!(gameObject instanceof Org)){
    return
  }
    console.log("gameObj", gameObject)
   
  if(this.rightsidebar) {
    this.rightsidebar.destroy()
   }
    this.rightsidebar = this.scene.add.text(1650,50,
      `\n 
      ID: ${gameObject.id} \n
      AGE: ${gameObject.age} \n
      ORGS: ${this.scene.orgs.getChildren().length}`, {color: "#000000",
      fontSize: 14}
  )};


  update() {
    if(this.orgs){
      for(let i = 0; i < this.orgs.getChildren().length; i++){
        let org = this.orgs.getChildren()[i]
        if(this.foods.getChildren().length > 0) {
          //this.checkClosestMoveTo(org,this.foods.getChildren())
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
    // console.log(Phaser.Math.Distance.Between(org,food))
    let closest = this.physics.closest(source,objects)
    console.log("distance", Phaser.Math.Distance.Between(source.x, source.y,closest.x, closest.y))
    //this.physics.moveTo()
    this.physics.moveToObject(source,closest,90)
  }

  addOrg() {
    let addedOrg = new Org(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), null, null, this.orgNum)
    this.orgNum++;
    addedOrg.setInteractive();
  }

  addFood(foodData) {
    new Food(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), foodData[Phaser.Math.Between(0, 4)])
  }
  
  getFoodData = async function() {
    return axios.get("http://localhost:3000/foods")
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err.message));
  }

  getGameID = async function() {
    //implement for loading saved games
  }

  spawn(org1, org2,) {
    if(org1.age > 500 && org2.age > 500 && org1.reproductionCycle >= 300 && org2.reproductionCycle >= 300){
      this.orgNum++

      const randomX = Phaser.Math.Between(-5, 5)
      const randomY = Phaser.Math.Between(-5, 5)

      let newOrg = new Org(this, org1.x + randomX, org1.y + randomY, org1, org2, this.orgNum)
      org1.reproductionCycle = 0;
      org2.reproductionCycle = 0;
      org1.setVelocity(0,0);
      org2.setVelocity(0,0);
      newOrg.setInteractive();

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
      org.energy += 15;
      food.energy -= 15;
      org.eatCycle = 0;
    } else if (food.energy <= 15 && food.energy > 0 && org.eatCycle > 350) {
      org.energy += food.energy;
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

  onSave(newGame) {
    console.log(document.cookie);
    // if(!newGame) {
    //   //implement for saving games after the initial save
    // } else {
    //   const url = "http://localhost:3000/game_saves";
    //   let gameData = {
    //     save_string
    //   }
    // }
  }

}

export default TitleScene;
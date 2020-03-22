import Phaser from "phaser";
import Org from "./Org";
import Food from "./Food";
import axios from "axios";


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


    //Create a black strip at the top of the screen.

    //=========================================================Pause================================================
    this.input.keyboard.on('keydown-SPACE', this.togglePause, this)
    this.pausePhysics = false;

   //===========================================Organisms====================================================

    this.background = this.add.image(400, 300, 'sky');

    this.orgs = this.physics.add.group();
   
    //Organisms on-click
    this.input.on("gameobjectdown", this.writeAttributes);

    this.r1 = new Org(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), null, null, 1)
    this.r2 = new Org(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), null, null, 2)
    this.r3 = new Org(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), null, null, 3)
    this.r4 = new Org(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), null, null, 4)
    this.r5 = new Org(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), null, null, 5)
    this.r6 = new Org(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), null, null, 6)
    this.orgNum = 6;
  
    this.r1.setInteractive()
    this.r2.setInteractive()
    this.r3.setInteractive()
    this.r4.setInteractive()
    this.r5.setInteractive()
    this.r6.setInteractive()

    this.physics.add.overlap(this.orgs, this.orgs, this.attackOrSpawn, null, this);
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
  //button = game.add.button()
 
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
        this.scene.onSave(this.scene.orgs.getChildren(), this.scene.foods.getChildren());
      }
    })

    this.lsToggle = this.add.text(200,20,"Toggle",{color: "#000000", fontSize: 14})
    this.lsToggle.setInteractive().on("pointerdown", function() {
      htmlForm.visible = (htmlForm.visible ? false : true)
    });

  //============================================================== Right sidebar ==============================================//  
  const rightSidebar = this.add
  .dom(1500, 300)
  .createFromCache("right-sidebar");

  this.background.setInteractive();

  //===========================================================Fullscreen Toggle=========================================================
  this.fsToggle = this.add.text(1800,20, "FULLSCREEN",{color: "#000000", fontSize: 14})

  this.fsToggle.setInteractive().on("pointerdown", function() {
    if (this.scene.scale.isFullscreen) {
        this.scene.scale.stopFullscreen();
        // On stop full screen
    } else {
        this.scene.scale.startFullscreen();
        // On start full screen
    }
  });
  // console.log(this.physics.pause)
  
  //=============================================================Testing stuff============================================================

  // console.log("this.cameras",this.cameras)

  // console.log("phaser.input",Phaser.Input)
  //console.log(this.game.renderer.snapshot)

  }

  update() {
   
    if(this.orgs && !this.pausePhysics){
      
      
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
        org.grow(0.25);
        org.body.velocityX = (org.body.velocityX * org.energy/2000)
        org.body.velocityY = (org.body.velocityY * org.energy/2000)
        
        // if (!org.age % 600) {
        //   org.tint = org.tint * 0.5;
        // }

        if(org.age === org.lifespan) {
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


  //When energy runs below 50% their speed is reduced 30%. when it is below 20% it is reduced to
  // Helper functions
  

  searchAlg(source, foodObjs, orgObjs) {
    //Energy, health, age, type, agression, predator, reproductive age

    //If type A, search for food, or mate 
    //If type B, search for food, 
  }

  //if search alg reveals nothing in perception distance
  movementFunc() {

  }

  checkClosestMoveTo(source,objects) {
    let closest = this.physics.closest(source,objects)
    if(source.distanceBetweenPerceived(closest)) {
      this.physics.moveToObject(source,closest,source.speed)
    }
  }

  consoleLog(pointer, gameObject ) {
    console.log(gameObject.id)
  }

  //document.querySelector("#rolum") 
  writeAttributes(pointer, gameObject) {

    if(!(gameObject instanceof Org)) {
      document.querySelector(".rightSidebarItems").innerHTML = ""
      return
    }

    document.querySelector(".rightSidebarItems").innerHTML = ""

    let rsElem = document.querySelector(".rightSidebarItems")
    let attrList = document.createElement("span")
    attrList.innerHTML = ` 
      <ul id="attrList">
      <li>Score: ${gameObject.score} </li> 
      <li>ID: ${gameObject.id}</li>
      <li>AGE: ${gameObject.age} </li>
      <li>ORGS: ${this.scene.orgs.getChildren().length} </li>
      <li>Speed: ${gameObject.speed} </li> 
      <li>Lifespan: ${gameObject.lifespan} </li> 
      <li>Strength: ${gameObject.strength} </li>
      <li>Aggression: ${gameObject.aggression} </li>
      <li>Predator: ${gameObject.predator} </li>
      <li>Perception: ${gameObject.perception} </li>
      <li>Energy Efficiency: ${gameObject.energy_efficiency} </li>
      <li>Health: ${gameObject.health} </li>
      <li>Max Energy: ${gameObject.max_energy} </li>
      <li>Litter Size: ${gameObject.litter_size} </li>
      <li>Breeding Age: ${gameObject.breeding_age} </li>
      <li>Generation: ${gameObject.generation} </li>
      <li>Parents: ${gameObject.parent1.id} ${gameObject.parent2.id} </li>
      </ul>
    `
    Phaser.DOM.AddToDOM(attrList, rsElem)
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

  attackOrSpawn(org1, org2,) {
    // if(org1.predator && !org2.predator){
    // org2.setTexture("damage")
    // org2.play("damage_anim")
    // } else if(org2.predator && !org1.predator){
    // org1.setTexture("damage")
    // org1.play("damage_anim")
    // } else if(org1.predator && org2.predator){
    // org1.setTexture("damage")
    // org1.play("damage_anim")
    // org2.setTexture("damage")
    // org2.play("damage_anim")
    // }else {
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
    //} 
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

  togglePause() {
  console.log("togglepause called")
    if (!this.pausePhysics) {
        this.physics.pause(); // resume game
        this.pausePhysics = true
        this.pauseText = this.add.text(this.game.config.width / 2, 20, "PAUSED",{color: "#000000",
        fontSize: 50})
    } else {

        this.pausePhysics = false
        this.physics.resume();
        this.pauseText.destroy();
        //pauseText.visible = true;
    }
}
  onSave = async function(orgs, foods) {
    const cookieArr = document.cookie.split(';');
    let gameID = cookieArr[1];
    gameID = gameID.slice(9);

    let gameStateObject = {
      orgs: [],
      foods: []
    };

    orgs.forEach((org) => {
      gameStateObject.orgs.push(org.getAttributes());
    })

    foods.forEach((food) => {
      gameStateObject.foods.push(food.getAttributes());
    })

    gameStateObject = JSON.stringify(gameStateObject);

    let newGameBool = await this.newGame(gameID);

    if(newGameBool) {
      console.log("UPDATING SAVE");
      const url = `http://localhost:3000/game_saves/${gameID}`;

      axios({
        method: 'PUT',
        url,
        data: { save_text: gameStateObject },
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' }
      })
      .then(resp => {
        console.log("Saved successfully:", resp);
      })
      .catch(err => console.log("Error attempting to save:", err.message));
    } else {
      console.log("POST NEW SAVE");
      const url = `http://localhost:3000/game_saves`;

      let gameData = {
        game_id: gameID,
        save_text: gameStateObject
      };
  
      axios({
        method: 'POST',
        url,
        data: gameData,
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' }
      })
      .then(resp => {
        console.log("Saved successfully:", resp);
      })
      .catch(err => console.log("Error attempting to save:", err.message));
    }
  }

  newGame = async function(gameID) {
    return axios.get(`http://localhost:3000/game_saves/${gameID}`)
      .then((res) => {
        return true;
      })
      .catch((err) => {
        if (err.message === "Request failed with status code 404") {
          return false;
        }
      })
  }

}

export default TitleScene;
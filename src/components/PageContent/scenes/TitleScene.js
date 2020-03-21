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

    //=========================================================pause================================================

    // this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    // if (Phaser.Input.Keyboard.JustDown(this.spacebar) && this.pausePhysics === false) {
    
    //   // Physics becomes active
    //   this.pausePhysics = true;
  
    //   // Pause `Physics`
    //   this.physics.pause();
  
    // } else {
    //   // Set `Physics` variable back to `off`
    //   this.pausePhysics = false;
    //   this.physics.resume();
    // }

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
    this.f1 = new Food(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), foodData[Phaser.Math.Between(1, 5)])
    this.f2 = new Food(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), foodData[Phaser.Math.Between(1, 5)])
    this.f3 = new Food(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), foodData[Phaser.Math.Between(1, 5)])
    this.f4 = new Food(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), foodData[Phaser.Math.Between(1, 5)])
    this.f5 = new Food(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), foodData[Phaser.Math.Between(1, 5)])

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
      }
    })

  //============================================================== Right sidebar ==============================================//  
  const rightSidebar = this.add
  .dom(1500, 300)
  .createFromCache("right-sidebar");
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

  console.log(this.game.dom)
  console.log(this.Phaser)
  console.log(this.scene)
  console.log(this)
  console.log(Phaser.DOM)
  console.log(Phaser)
  console.log(document.querySelector("#test"))
  //console.log(document.cookie, "cookie")
  
  //document.querySelector
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

    // this.rightsidebar = this.scene.add.text(1650,50,
    //   `\n 
    //   Score: ${gameObject.score} \n
    //   ID: ${gameObject.id} \n
    //   AGE: ${gameObject.age} \n
    //   ORGS: ${this.scene.orgs.getChildren().length} \n
    //   Speed: ${gameObject.speed} \n 
    //   Lifespan: ${gameObject.lifespan} \n 
    //   Strength: ${gameObject.strength} \n
    //   Aggression: ${gameObject.aggression} \n
    //   Predator: ${gameObject.predator} \n
    //   Perception: ${gameObject.perception} \n
    //   Energy Efficiency: ${gameObject.energy_efficiency} \n
    //   Health: ${gameObject.health} \n
    //   Max Energy: ${gameObject.max_energy} \n
    //   Litter Size: ${gameObject.litter_size} \n
    //   Breeding Age: ${gameObject.breeding_age} \n
    //   Generation: ${gameObject.generation} \n
    //   Parents: ${gameObject.parent1.id} ${gameObject.parent2.id} \n
    //   `, {color: "#000000",
    //   fontSize: 14}
  //)};


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

  checkClosestMoveTo(source,objects) {
    let closest = this.physics.closest(source,objects)
    if(source.distanceBetweenPerceived(closest)) {
      this.physics.moveToObject(source,closest,source.speed)
  }
}

  addOrg() {
    let addedOrg = new Org(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), null, null, this.orgNum)
    this.orgNum++;
    addedOrg.setInteractive();
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

}

export default TitleScene;
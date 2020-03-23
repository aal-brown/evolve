import Phaser from "phaser";
import Org from "./Org";
import Food from "./Food";
import axios from "axios";


class TitleScene extends Phaser.Scene {

  constructor() {
    super('TitleScene')
  }

  async create() {
    //==========================================================Creating New Game / Loading Game================================================================
    this.iterations = 0;
    this.newGameBool = true;
    const cookieArr = document.cookie.split(';');
    let gameID = cookieArr[1];
    if (gameID) {
      gameID = gameID.slice(9);
      this.newGameBool = await !this.newGame(gameID);
    }

    this.background = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'sky')
    this.background.setOrigin(0,0);

    const foodData = await this.getFoodData();
    this.orgNum = 0;
    this.foods = this.physics.add.group();
    this.orgs = this.physics.add.group();
    
    if (!this.newGameBool) {
      let gameData = await this.getGameData(gameID);
      gameData = JSON.parse(gameData.save_text);
      
      const loadedOrgs = gameData.orgs;
      const loadedFoods = gameData.foods;
      this.iterations = gameData.iterations;

      for (const org of loadedOrgs) {
        this.orgNum++
        let newOrg = new Org(this, org.xcoord, org.ycoord, null, null, org.orgNum)

        newOrg.age = org.age;
        newOrg.score = org.score;
        newOrg.reproductionCycle = org.reproductionCycle;
        newOrg.eatCycle = org.eatCycle;
        newOrg.scale = org.scale;
        newOrg.energy = org.energy;
        newOrg.velx = org.velx;
        newOrg.vely = org.vely
        newOrg.colour = org.colour;
        newOrg.lifespan = org.lifespan;
        newOrg.strength = org.strength;
        newOrg.energy_efficiency = org.energy_efficiency;
        newOrg.max_energy = org.max_energy;
        newOrg.aggression = org.aggression;
        newOrg.health = org.health;
        newOrg.predator = org.predator;
        newOrg.perception = org.perception;
        newOrg.litter_size = org.litter_size;
        newOrg.breeding_age = org.breeding_age;
        newOrg.speed = org.speed;
        newOrg.type = org.type;
        newOrg.generation = org.generation;
        newOrg.parent1 = org.parent1;
        newOrg.parent2 = org.parent2;
        newOrg.xcoord = org.xcoord;
        newOrg.ycoord = org.ycoord;

        newOrg.setInteractive();
      }
      for (const food of loadedFoods) {
        let newFood = new Food(this, food.x, food.y,  {name: food.nameStr, energy: food.energy})
        newFood.energy -= 4000;
        newFood.setInteractive();
      }
    } else {
      for(let j = 0; j < 15; j++){
        let newOrg =  new Org(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), null, null, j+1)
        newOrg.setInteractive();
        this.orgNum++
      }

      this.f1 = new Food(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), foodData[Phaser.Math.Between(0, 4)])
      this.f2 = new Food(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), foodData[Phaser.Math.Between(0, 4)])
      this.f3 = new Food(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), foodData[Phaser.Math.Between(0, 4)])
      this.f4 = new Food(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), foodData[Phaser.Math.Between(0, 4)])
      this.f5 = new Food(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), foodData[Phaser.Math.Between(0, 4)])
      this.f6 = new Food(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), foodData[Phaser.Math.Between(0, 4)])
      this.f7 = new Food(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), foodData[Phaser.Math.Between(0, 4)])

      this.f1.setInteractive();
      this.f2.setInteractive();
      this.f3.setInteractive();
      this.f4.setInteractive();
      this.f5.setInteractive();
      this.f6.setInteractive();
      this.f7.setInteractive();

    }
      
    //===================================================================Pause======================================================
    this.input.keyboard.on('keydown-SPACE', this.togglePause, this)
    this.pausePhysics = false;

   //==================================================================Organisms====================================================
    
    this.input.on("gameobjectdown", this.writeAttributes);
  
    this.physics.add.collider(this.orgs, this.orgs, this.attackOrSpawn, null, this);

    //==============================================================Foods==========================================================
    
    
    this.physics.add.overlap(this.orgs, this.foods, this.eat, null, this);

  //============================================================== left sidebar ==============================================//
  //button = game.add.button()
 
    const leftSidebar = this.add
    .dom(100, 20)
    .createFromCache("buttons");

    leftSidebar.setOrigin(0,0)
    leftSidebar.addListener("click");

    leftSidebar.on("click", function(event) {
      if (event.target.name === "addOrg") {
        this.scene.addOrg();
      } else if (event.target.name === "addFood") {
        this.scene.addFood(foodData);
      } else if (event.target.name === "foodToggle") {
        document.querySelector("#removeBlocksToggle").checked = false
        document.querySelector("#addBlocksToggle").checked = false
      } else if (event.target.name === "addBlocksToggle") {
        document.querySelector("#removeBlocksToggle").checked = false
        document.querySelector("#addFoodToggle").checked = false
      } else if (event.target.name === "removeBlocksToggle") {
        document.querySelector("#addBlocksToggle").checked = false
        document.querySelector("#addFoodToggle").checked = false
      }
    })
    let userID = cookieArr[0];
    userID = userID.slice(8);
    let saveButtons;

    if(userID){
      saveButtons = this.add
      .dom(100, 200)
      .createFromCache("save-and-seed");
  
      saveButtons.setOrigin(0,0)
      saveButtons.addListener("click");
  
      saveButtons.on("click", function(event) {
        if (event.target.name === "save") {
          this.scene.onSave(this.scene.orgs.getChildren(), this.scene.foods.getChildren(), this.scene.iterations);
        }
      })
    }
    

    this.lsToggle = this.add.sprite(10,5,"toggle-ls")
    this.lsToggle.setScale(0.5)
    this.lsToggle.setOrigin(0,0)
    this.lsToggle.setInteractive().on("pointerdown", function() {
      leftSidebar.visible = (leftSidebar.visible ? false : true)
      saveButtons.visible = (saveButtons.visible ? false : true)
    });

  //============================================================== Right sidebar ==============================================//  
  const rightSidebar = this.add
  .dom((this.game.config.width - 130),80)
  .createFromCache("right-sidebar");

  rightSidebar.setOrigin(0,0)

  this.background.setInteractive();

  //===========================================================Fullscreen Toggle=========================================================
  this.fsToggle = this.add.sprite((this.game.config.width - 55),10, "fullscreen")
  this.fsToggle.setOrigin(0,0)
  this.fsToggle.setScale(0.5)

  this.fsToggle.setInteractive().on("pointerdown", function() {
    if (this.scene.scale.isFullscreen) {
        this.scene.scale.stopFullscreen();
        this.fsToggle = this.setTexture("fullscreen");
    } else {
        this.fsToggle = this.setTexture("minimize")
        this.scene.scale.startFullscreen();
    }
  });

  //===============================================================Slider Feed===========================================================

  this.input.on("pointerdown", function(pointer) {
    if (document.querySelector("#foodToggle").checked) {
      let nFood = new Food(this.scene, pointer.x, pointer.y, foodData[Phaser.Math.Between(0, 4)])
      nFood.setInteractive();
    }
  })
  
  //=============================================================Testing stuff============================================================




  //================================================================Blocks==================================================================
  
  let rt = this.add.renderTexture(0, 0, this.game.config.width, this.game.config.height)
  this.platforms = this.physics.add.staticGroup()
  this.physics.add.collider(this.orgs, this.platforms)
  

   
  this.input.on("pointerdown", function(pointer) {
    if (pointer.isDown && document.querySelector("#addBlocksToggle").checked) {
      this.newBlock = this.platforms.create(pointer.x, pointer.y, 'block')
      this.newBlock.setInteractive();
    }
  },this) 
    
    this.input.on("gameobjectdown", function(pointer, gameObject) {
      if (document.querySelector("#removeBlocksToggle").checked && gameObject.type !== "TileSprite") {
        gameObject.destroy()
      }
    } 
  )
  
  }

  update() {
    this.iterations++
    if (this.orgs && !this.pausePhysics){
      if(this.avgAndScore){
        this.avgAndScore.destroy();
      }
     
      this.avgScore = Math.floor((this.getAvgScore(this.orgs.getChildren())));
      this.highestScore = this.getHighestScore(this.orgs.getChildren());
      this.numOrgs = this.orgs.getChildren().length;
      
      this.avgAndScore = this.add.text(this.game.config.width / 2, 20, `Avg Score: ${this.avgScore}  No. Orgs: ${this.numOrgs}  Highest Score: ${this.highestScore}`,{color: "#000000", fontSize: 20})
      
      for (let i = 0; i < this.orgs.getChildren().length; i++){
        let org = this.orgs.getChildren()[i]

        if (this.foods.getChildren().length > 0) {
          this.searchAlg(org,this.foods.getChildren(), this.orgs.getChildren());
        }
        
        this.lifeCycle(org)
        this.energyCycle(org)
        
        org.grow(0.25);
        
      }
        for (let i = 0; i < this.foods.getChildren().length; i++){
          let food = this.foods.getChildren()[i]

          if (food.energy <= 0) {
            food.destroy();
          }
        }
    }
  }


  //When energy runs below 50% their speed is reduced 30%. when it is below 20% it is reduced to
  // Helper functions

  getAvgScore(orgObjs) {
    // let avgScore = 0;
    let sum = 0;
    
    if (orgObjs.length) {
      // avgScore = orgObjs.reduce((acc,item) => (acc+item.score),(orgObjs[0].score))/orgObjs.length
      orgObjs.forEach((val) => sum += val.score)
    }

   //console.log(sum/orgObjs.length, avgScore)
    return sum/orgObjs.length
  }
  
  getHighestScore(orgObjs) {
    let highestScore = 0;
      for(let k = 0; k < orgObjs.length; k++){
        if(orgObjs[k].score > highestScore){
          highestScore = orgObjs[k].score
        }
      }
  return highestScore
}

  lifeCycle(org) {
    org.reproductionCycle++;
    // org.eatCycle++;
    org.age++
    if(org.age === org.lifespan || org.health === 0) {
      org.tint = 0.001 * 0xffffff;
      org.setVelocity(0,0);
      this.orgs.remove(org, false, false)
      this.dyingOrg(org);
    }
  }

  energyCycle(org) {
    let elFactor = 1;
    if (org.energy_efficiency > 75) {
      elFactor = 1 - ((org.energy_efficiency - 75) / org.energy_efficiency)
    } else if (org.energy_efficiency < 75) {
      elFactor = 75 / org.energy_efficiency
    }

    if (org.energy <= 0) {
      org.energy = 0
    } else {
      org.energy = org.energy - (1 * elFactor)
    }
    
    if (org.energy < 30) {
      org.health -= 1
    } 
    if (org.energy > 30 && org.health < org.max_health) {
      org.health++
    }
  }

  togglePause(event) {
    event.preventDefault();
    if (!this.pausePhysics) {
        this.physics.pause(); 
        this.pausePhysics = true
        this.pauseText = this.add.text(this.game.config.width / 2, this.game.config.height / 2, "PAUSE",{color: "#000000", fontSize: 50})

    } else {
        this.pausePhysics = false
        this.physics.resume();
        this.pauseText.destroy();
    }
  }

  searchAlg(source, foodObjs, orgObjs) {
    if (source.type === 2 && (source.energy/source.max_energy)*100 >=  50 && (source.max_health/source.health)*100 >= 50 && source.age >= source.breeding_age && source.reproductionCycle >= 300 ) {
      source.status = "Searching for mate"
      let arr = this.createOrgArray(source,orgObjs)
      if (arr.length) {
        this.physics.moveToObject(source,arr[0],source.speed)
      // this.checkClosestMoveTo(source, arr, true)
      }
    } else {
      source.status = "Searching for food"
      this.checkClosestMoveTo(source, foodObjs, false)
    }
  }

  createOrgArray(source, orgObjs) {
    let arr = [];
    for(const org of orgObjs) {
      if(source.distanceBetweenPerceived(org) && org.type === 1 ) {
        arr.push(org)
      }
    }
    //Sorts by the highest scoring type1's
    arr.sort((a,b) => b.score - a.score)
    return arr
  }

  //if search alg reveals nothing in perception distance
  movementFunc() {

  }

  //If false, then it will only
  checkClosestMoveTo(source,objects,bool) {
    if (objects.length) {
      let closest = this.physics.closest(source,objects)
      if (bool) {
      this.physics.moveToObject(source,closest,source.speed)
      return
      }
      if(source.distanceBetweenPerceived(closest)) {
        this.physics.moveToObject(source,closest,source.speed)
      }
    }
    return
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
      <li>Status: ${gameObject.status} </li> 
      <li>Score: ${gameObject.score} </li> 
      <li>ID: ${gameObject.id}</li>
      <li>Age: ${gameObject.age} </li>
      <li>Health: ${gameObject.health} </li>
      <li>Energy: ${Math.floor(gameObject.energy)} </li>
      <li>Speed: ${gameObject.speed} </li> 
      <li>Lifespan: ${gameObject.lifespan} </li> 
      <li>Strength: ${gameObject.strength} </li>
      <li>Aggression: ${gameObject.aggression} </li>
      <li>Predator: ${gameObject.predator} </li>
      <li>Perception: ${gameObject.perception} </li>
      <li>Energy Efficiency: ${gameObject.energy_efficiency} </li>
      <li>Max Health: ${gameObject.max_health} </li>
      <li>Max Energy: ${gameObject.max_energy} </li>
      <li>Litter Size: ${gameObject.litter_size} </li>
      <li>Breeding Age: ${gameObject.breeding_age} </li>
      <li>Type: ${gameObject.type} </li>
      <li>Generation: ${gameObject.generation} </li>
      <li>Parents: ${gameObject.parent1} ${gameObject.parent2}</li>
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
    let newFood1 = new Food(this, Phaser.Math.Between(20,this.game.config.width), Phaser.Math.Between(20,this.game.config.height), foodData[Phaser.Math.Between(0, 4)])
    newFood1.setInteractive();
  }

  getFoodData = async function() {
    return axios.get("http://localhost:3000/foods")
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err.message));
  }

  attackOrSpawn(org1, org2) {
    // if(org1.predator && !org2.predator){
    //   org2.setTexture("damage")
    //   org2.play("damage_anim")
    // } else if(org2.predator && !org1.predator){
    //   org1.setTexture("damage")
    //   org1.play("damage_anim")
    // } else if(org1.predator && org2.predator){
    //   org1.setTexture("damage")
    //   org1.play("damage_anim")
    //   org2.setTexture("damage")
    //   org2.play("damage_anim")
    // }else {
      if(this.breedingCheck(org1,org2) && org1.reproductionCycle >= 300 && org2.reproductionCycle >= 300){
        org1.status = "Breeding"
        org2.status = "Breeding"
        let type1 = this.orderTypes(org1, org2)[0]
        type1.energy -= 50

        for(let i=0; i< type1.litter_size; i++){ 
          const randomX = Phaser.Math.Between(-5, 5)
          const randomY = Phaser.Math.Between(-5, 5)
          let newOrg = new Org(this, org1.x + randomX, org1.y + randomY, org1, org2, this.orgNum)
          this.orgNum++
          newOrg.setInteractive();
        }
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
    //} 
  }

  orderTypes(org1, org2){
     return (org1.type < org2.type ? [org1, org2] : [org2, org1])
  }
  
  breedingCheck(org1,org2) {
    let [type1, type2] = this.orderTypes(org1, org2)
 
    if(type1.type === type2.type){
      return false
    } else if (type2.score - type1.score > -150 && type1.age >= type1.breeding_age && type2.age >= type2.breeding_age && type2.energy && (type2.energy/type2.max_energy)*100 >= 50 && (type2.health/type2.max_health)*100 >= 75 && (type1.energy/type1.max_energy) * 100 >= 50 && (type1.health/type1.max_health)*100 >= 75){
      return true
    } else{
      return false
    }
  }

  eat(org, food) {
    org.status = "Eating"
    let eDiff = org.max_energy - org.energy
    if (food.energy > 15 && eDiff > 0) {
      if (eDiff < 15) {
        org.energy += eDiff;
        food.energy -= eDiff;
      } else {
        org.energy += 15
        food.energy -= 15
      }
    } else if (food.energy <= 15 && food.energy > 0 && eDiff > 0) {
      if (eDiff < food.energy) {
        org.energy += eDiff
        food.energy -= eDiff
      } else {
        org.energy += food.energy
        food.energy = 0
      }
    }
  }

  dyingOrg(org){
    org.status = "Dying:"
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
  
  onSave = async function(orgs, foods, iterations) {
    const cookieArr = document.cookie.split(';');
    let gameID = cookieArr[1];
    if(gameID) {
      gameID = gameID.slice(9);

      let gameStateObject = {
        orgs: [],
        foods: [],
        iterations: iterations
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
        const gameSaveUrl = `http://localhost:3000/game_saves/${gameID}`;

        axios({
          method: 'PUT',
          url: `http://localhost:3000/game_saves/${gameID}`,
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
        const gameSaveUrl = `http://localhost:3000/game_saves`;

        let gameData = {
          game_id: gameID,
          save_text: gameStateObject
        };

        axios({
          method: 'POST',
          url: `http://localhost:3000/game_saves`,
          data: gameData,
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' }
        })
        .then(resp => {
          console.log("Saved successfully for game saves:", resp);
        })
        .catch(err => console.log("Error attempting to save:", err.message));
      }

      console.log("UPDATING GAME");

        // const gameUrl = ;
        let gameStats = {
          highest_score: this.highestScore,
          playtime: iterations,
          num_of_orgs: this.numOrgs
        };
        console.log(gameStats)
        axios({
          method: 'PUT',
          url: `http://localhost:3000/games/${gameID}`,
          data: gameStats,
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' }
        })
        .then(resp => {
          console.log("Updated successfully for games:", resp);
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

  getGameData = async function(gameID) {
    return axios.get(`http://localhost:3000/game_saves/${gameID}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err.message))
  }

  getHighestScoreDB
}

export default TitleScene;
import Phaser from "phaser";
import Org from "./Org";
import Food from "./Food";
import Explosion from "./Explosion";
import axios from "axios";


class TitleScene extends Phaser.Scene {

  constructor() {
    super('TitleScene')
  }

  async create() {
    //==========================================================Creating New Game / Loading Game================================================================
    this.iterations = 0;
    this.newGameBool = false;
    let gameID = null;
    let userID = null;
    const cookieArr = document.cookie.split(';');

    for (let cookie of cookieArr) {
      if (cookie.includes('user_id')) {
        userID = cookie.slice(8);
      } else if (cookie.includes('game_id')) {
        gameID = cookie.slice(9);
        this.newGameBool = await this.newGame(gameID);
      }
    }

    //Implementing game music
    this.main_theme = this.sound.add("main_theme")
    let musicConfig = {
      mute: false,
      volume: 0.25,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    }

    this.main_theme.play(musicConfig)

    //this.background = this.add.image(0, 0, 'background-small')
    //this.background = this.add.tileSprite(0, 0, 5000, 3333, 'background-small')
    this.background = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'moon')
    this.background.setOrigin(0, 0);
    this.background.setInteractive();

    const foodData = ["banana", "tomato", "watermelon", "kiwi", "strawberry"];
    this.orgNum = 0;
    this.foods = this.physics.add.group();
    this.orgs = this.physics.add.group();
    this.foods.setDepth(0)
    this.blocks = this.physics.add.staticGroup()


  //This was moved here to make the predator buttons work
    const leftSidebar = this.add
      .dom(100, 20)
      .createFromCache("buttons");

    leftSidebar.setOrigin(0, 0)
    leftSidebar.addListener("click");

    this.lsToggle = this.add.image(10, 5, "toggle-ls")
    this.lsToggle.setScale(0.5)
    this.lsToggle.setDepth(3)
    this.lsToggle.setOrigin(0, 0)

    leftSidebar.setOrigin(0,0)
    leftSidebar.addListener("click");
  
    leftSidebar.on("click", function(event) {
      if (event.target.name === "addOrg") {
        this.scene.addOrg();
      } else if (event.target.name === "addFood") {
        this.scene.addFood(foodData);
      } else if (event.target.id === "dragToggle") {
        document.querySelector(".block-selectors").style.visibility = "hidden";
      } else if (event.target.id === "foodToggle") {
        document.querySelector(".block-selectors").style.visibility = "hidden";
      } else if (event.target.id === "addBlocksToggle") {
        document.querySelector(".block-selectors").style.visibility = "visible";
      } else if (event.target.id === "removeBlocksToggle") {
        document.querySelector(".block-selectors").style.visibility = "hidden";
      } 
  
    })

    if (this.newGameBool) {
      let gameData = await this.getGameData(gameID);
      gameData = JSON.parse(gameData.save_text);
      const loadedOrgs = gameData.orgs;
      const loadedFoods = gameData.foods;
      const loadedBlocks = gameData.blocks;
      this.iterations = gameData.iterations;

      for (const org of loadedOrgs) {
        this.orgNum++
        let newOrg = new Org(this, org.xcoord, org.ycoord, null, null, org.orgNum)
        newOrg.status = org.org_status
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
        newOrg.sex = org.sex;
        newOrg.generation = org.generation;
        newOrg.parent1 = org.parent1;
        newOrg.parent2 = org.parent2;
        newOrg.xcoord = org.xcoord;
        newOrg.ycoord = org.ycoord;
        newOrg.invincible = org.invincible;
        newOrg.ageless = org.ageless;

        newOrg.setInteractive();
        newOrg.setDepth(2)
        this.input.setDraggable(newOrg)
        if (newOrg.predator && document.querySelector("#predatorToggle").checked) {
          newOrg.setTexture("predator")
          newOrg.play("pred_anim")
        }
      }
      for (const food of loadedFoods) {
        let newFood = new Food(this, food.x, food.y, food.nameStr)
        newFood.energy = food.energy;
        newFood.setInteractive();
        newFood.setDepth(0)
        this.input.setDraggable(newFood);
      }
      for (const block of loadedBlocks) {
        if(!block.texture){
          block.texture = "block"
        }
        let newBlock = this.blocks.create(block.x, block.y, block.texture)
        newBlock.rotation = block.rotation;
        newBlock.setInteractive();
        this.input.setDraggable(newBlock);
      }
    } else {
      for (let j = 0; j < 15; j++) {
        let newOrg = new Org(this, Phaser.Math.Between(20, this.game.config.width), Phaser.Math.Between(20, this.game.config.height), null, null, j + 1)
        newOrg.setInteractive();
        this.input.setDraggable(newOrg)
        this.orgNum++
        if (newOrg.predator && document.querySelector("#predatorToggle").checked) {
          newOrg.setTexture("predator")
          newOrg.play("pred_anim")
        }
        this.orgNum++
        newOrg.setDepth(2)
      }

      this.f1 = new Food(this, Phaser.Math.Between(20, this.game.config.width), Phaser.Math.Between(20, this.game.config.height), foodData[Phaser.Math.Between(0, 4)])
      this.f2 = new Food(this, Phaser.Math.Between(20, this.game.config.width), Phaser.Math.Between(20, this.game.config.height), foodData[Phaser.Math.Between(0, 4)])
      this.f3 = new Food(this, Phaser.Math.Between(20, this.game.config.width), Phaser.Math.Between(20, this.game.config.height), foodData[Phaser.Math.Between(0, 4)])
      this.f4 = new Food(this, Phaser.Math.Between(20, this.game.config.width), Phaser.Math.Between(20, this.game.config.height), foodData[Phaser.Math.Between(0, 4)])
      this.f5 = new Food(this, Phaser.Math.Between(20, this.game.config.width), Phaser.Math.Between(20, this.game.config.height), foodData[Phaser.Math.Between(0, 4)])
      this.f6 = new Food(this, Phaser.Math.Between(20, this.game.config.width), Phaser.Math.Between(20, this.game.config.height), foodData[Phaser.Math.Between(0, 4)])
      this.f7 = new Food(this, Phaser.Math.Between(20, this.game.config.width), Phaser.Math.Between(20, this.game.config.height), foodData[Phaser.Math.Between(0, 4)])

      this.f1.setInteractive();
      this.f2.setInteractive();
      this.f3.setInteractive();
      this.f4.setInteractive();
      this.f5.setInteractive();
      this.f6.setInteractive();
      this.f7.setInteractive();
      this.f1.setDepth(0)
      this.f2.setDepth(0)
      this.f3.setDepth(0)
      this.f4.setDepth(0)
      this.f5.setDepth(0)
      this.f6.setDepth(0)
      this.f7.setDepth(0)

      this.input.setDraggable(this.f1)
      this.input.setDraggable(this.f2)
      this.input.setDraggable(this.f3)
      this.input.setDraggable(this.f4)
      this.input.setDraggable(this.f5)
      this.input.setDraggable(this.f6)
      this.input.setDraggable(this.f7)

    }

    
    //===================================================================Pause======================================================
    this.input.keyboard.on('keydown-SPACE', this.togglePause, this)
    this.pausePhysics = false;

    //==================================================================Organisms Interactions====================================================

    this.input.on("gameobjectdown", this.writeAttributes);

    //This drag function isn't speciific to organisms, it applies to any game organism
    this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
      if (gameObject.type === "Sprite") {
        gameObject.x = dragX;
      gameObject.y = dragY;
      }
    })

    this.physics.add.collider(this.orgs, this.orgs, this.attackOrSpawn, null, this);

    //==============================================================Foods Interactions==========================================================


    this.physics.add.overlap(this.orgs, this.foods, this.eat, null, this);

    //============================================================== left sidebar ==============================================//
    //button = game.add.button()

    let saveButtons;

    if (userID) {
      saveButtons = this.add
        .dom(100, 243)
        .createFromCache("save-and-seed");

      saveButtons.setOrigin(0, 0)
      saveButtons.addListener("click");

      saveButtons.on("click", function (event) {
        if (event.target.name === "save") {
          this.scene.onSave(this.scene.orgs.getChildren(), this.scene.foods.getChildren(), this.scene.blocks.getChildren(), this.scene.iterations);
        }
      })
    }

    this.lsToggle.setInteractive().on("pointerdown", function () {
      if (leftSidebar) {
        leftSidebar.visible = (leftSidebar.visible ? false : true)
      }
      if (saveButtons) {
        saveButtons.visible = (saveButtons.visible ? false : true)
      }
    });

    //============================================================== Right sidebar ==============================================//  
    let rightSidebar = this.add
    .dom((this.game.config.width - 10), 80)
    .createFromCache("right-sidebar");

    rightSidebar.setOrigin(1, 0)
    rightSidebar.addListener("click");

    rightSidebar.on("click", function(event) {
      let orgID = document.getElementById("orgID").value
      event.preventDefault();
      if (event.target.name === "agelessToggle") {
        document.querySelector(".rightSidebarItems").innerHTML = ""
        for(const org of this.scene.orgs.getChildren()) {
          if (org.id === orgID) {
            org.ageless = (org.ageless === true ? false : true)
          }
        }
      } else if (event.target.name === "invincibleToggle") {
        document.querySelector(".rightSidebarItems").innerHTML = ""
        for(const org of this.scene.orgs.getChildren()) {
          if (org.id === orgID) {
            org.invincible = (org.invincible === true ? false : true)
          }
        }
      }
    });

    //In order to clear the right sidebar
    //


    

    //===========================================================Fullscreen Toggle=========================================================
    this.fsToggle = this.add.image((this.game.config.width - 55), 10, "fullscreen")
    this.fsToggle.setOrigin(0, 0)
    this.fsToggle.setDepth(3)
    this.fsToggle.setScale(0.5)

    this.fsToggle.setInteractive().on("pointerdown", function () {
      if (this.scene.scale.isFullscreen) {
        this.scene.scale.stopFullscreen();
        this.fsToggle = this.setTexture("fullscreen");
      } else {
        this.fsToggle = this.setTexture("minimize")
        this.scene.scale.startFullscreen();
      }
    });

    //===============================================================Slider Feed===========================================================

    this.input.on("pointerdown", function (pointer) {
      if (document.querySelector("#foodToggle").checked) {
        document.querySelector(".block-selectors").style.visibility = "hidden";
        let nFood = new Food(this.scene, pointer.x, pointer.y, foodData[Phaser.Math.Between(0, 4)])
        nFood.setInteractive();
        this.scene.input.setDraggable(nFood)
        nFood.setDepth(0)
      }
    })

    //=============================================================Mute Sound============================================================
    this.soundToggle = this.add.image((this.game.config.width - 110), 10, "volume-on")
    this.soundToggle.setDepth(3)
    this.soundToggle.setOrigin(0, 0)
    this.soundToggle.setScale(0.08)

    this.soundToggle.setInteractive().on("pointerdown", function () {
      if (this.scene.main_theme.isPlaying) {
        this.soundToggle = this.setTexture("volume-mute");
        this.scene.main_theme.stop()
      } else {
        this.soundToggle = this.setTexture("volume-on");
        this.scene.main_theme.play()
      }
    });

    //================================================================Draw====================================================================
    let rt = this.add.renderTexture(0, 0, this.game.config.width, this.game.config.height)

    this.input.on("pointermove", function (pointer) {
      if (document.querySelector("#draw").checked) {
        if (pointer.isDown){
          rt.draw('circle', pointer.x - 16, pointer.y - 16)
        }
      } else if (document.querySelector("#erase").checked)
      if (pointer.isDown){
        rt.erase('block', pointer.x - 16, pointer.y - 16)
      }
      }, this.scene);



    //================================================================Blocks==================================================================

    // moved to top
    // this.blocks = this.physics.add.staticGroup()
    this.physics.add.collider(this.orgs, this.blocks)



    this.input.on("pointerdown", function (pointer) {
      if (pointer.isDown && document.querySelector("#addBlocksToggle").checked) {  
        document.querySelector(".block-selectors").style.visibility = "visible";

        // if( document.querySelector("#platRangle").checked){
        //   this.newBlock = this.blocks.create(pointer.x, pointer.y, 'platHoriz')
        //   this.newBlock.setInteractive();
        //   this.newBlock.rotation += 40;
        //   this.input.setDraggable(this.newBlock)
        // }
        // else if( document.querySelector("#platLangle").checked){
        //   this.newBlock = this.blocks.create(pointer.x, pointer.y, 'platHoriz')
        //   this.newBlock.rotation -= 40;
        //   this.newBlock.setInteractive();
        //   this.input.setDraggable(this.newBlock)

        if( document.querySelector("#platHoriz").checked){
          this.newBlock = this.blocks.create(pointer.x, pointer.y, 'platHoriz')
          this.newBlock.setInteractive();
          this.input.setDraggable(this.newBlock)
        } else if( document.querySelector("#platVert").checked){
          this.newBlock = this.blocks.create(pointer.x, pointer.y, 'platVert')
          this.newBlock.setInteractive();
          this.input.setDraggable(this.newBlock)
        } else if( document.querySelector("#block").checked){
          this.newBlock = this.blocks.create(pointer.x, pointer.y, 'block')
          this.newBlock.setInteractive();
          this.input.setDraggable(this.newBlock)
        } else if( document.querySelector("#rock").checked){
          this.newBlock = this.blocks.create(pointer.x, pointer.y, 'rock')
          this.newBlock.setInteractive();
          this.input.setDraggable(this.newBlock)
        } else if( document.querySelector("#rock2").checked){
          this.newBlock = this.blocks.create(pointer.x, pointer.y, 'rock2')
          this.newBlock.setInteractive();
          this.input.setDraggable(this.newBlock)
        } else if( document.querySelector("#bush1").checked){
          this.newBlock = this.blocks.create(pointer.x, pointer.y, 'bush1')
          this.newBlock.setInteractive();
          this.input.setDraggable(this.newBlock)
        } else if( document.querySelector("#bush2").checked){
          this.newBlock = this.blocks.create(pointer.x, pointer.y, 'bush2')
          this.newBlock.setInteractive();
          this.input.setDraggable(this.newBlock)
        }
      }
    }, this)

    this.input.on("gameobjectdown", function (pointer, gameObject) {
      if (document.querySelector("#removeBlocksToggle").checked && gameObject.type === "Sprite") {
        gameObject.destroy()
      }
    })
  }

  update() {
    this.iterations++
    if (this.orgs && !this.pausePhysics) {
      if (this.avgAndScore) {
        this.avgAndScore.destroy();
      }

      this.avgScore = Math.floor((this.getAvgScore(this.orgs.getChildren())));
      this.highestScore = this.getHighestScore(this.orgs.getChildren());
      this.numOrgs = this.orgs.getChildren().length;

      this.avgAndScore = this.add.text(this.game.config.width / 2, 20, `Avg Score: ${this.avgScore}  No. Orgs: ${this.numOrgs}  Highest Score: ${this.highestScore}`, { color: "#000000", fontSize: 20 })
      this.avgAndScore.setDepth(3)
      this.avgAndScore.setOrigin(0.5, 0.5)
       
      // console.log(this.avgAndScore)
      for (let i = 0; i < this.orgs.getChildren().length; i++) {
        let org = this.orgs.getChildren()[i]

        if (this.foods.getChildren().length > 0) {
          this.searchAlg(org, this.foods.getChildren(), this.orgs.getChildren());
        }

        this.movementFunc(org)
        this.lifeCycle(org)
        this.energyCycle(org)

        org.grow(0.25);
        this.damageTexture(org, org.health, org.isShowingDamage)
        this.regTexture(org, org.health, org.isShowingDamage)
        org.speedBoost++;
        org.damageCycle++;
        if (org.speedBoost === 50) {
          org.setVelocity(org.velx - 50, org.vely - 50)
          console.log("reset speedBoost")
        }

        if(org.predator){
          this.predTexture(org)
        }

      }
      for (let i = 0; i < this.foods.getChildren().length; i++) {
        let food = this.foods.getChildren()[i]

        if (food.energy <= 0) {
          food.destroy();
        }
      }
    }
  }

//=========================================================================================================FUNCTIONS======================================================================================

  getAvgScore(orgObjs) {
    // let avgScore = 0;
    let sum = 0;

    if (orgObjs.length) {
      // avgScore = orgObjs.reduce((acc,item) => (acc+item.score),(orgObjs[0].score))/orgObjs.length
      orgObjs.forEach((val) => sum += val.score)
      return sum / orgObjs.length
    }
    
    return 0
  }

  getHighestScore(orgObjs) {
    let highestScore = 0;
    for (let k = 0; k < orgObjs.length; k++) {
      if (orgObjs[k].score > highestScore) {
        highestScore = orgObjs[k].score
      }
    }
    return highestScore
  }

  lifeCycle(org) {
    org.reproductionCycle++;
    if(!org.ageless && !org.invincible ) {
      org.age++
    }
    if (org.age === org.lifespan || org.health === 0) {
      org.tint = 0.001 * 0xffffff;
      org.setVelocity(0, 0);
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

    if (org.energy < 30 && !org.invincible) {
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
      this.pauseText = this.add.text(this.game.config.width / 2, this.game.config.height / 2, "PAUSE", { color: "#000000", fontSize: 50 })
      this.main_theme.pause();
      this.pauseText.setOrigin(0.5, 0.5)

    } else {
      this.pausePhysics = false
      this.physics.resume();
      this.pauseText.destroy();
      this.main_theme.resume();
    }
  }

  searchAlg(source, foodObjs, orgObjs) {
    if (source.sex === 2 && (source.energy / source.max_energy) * 100 >= 50 && (source.max_health / source.health) * 100 >= 50 && source.age >= source.breeding_age && source.reproductionCycle >= 300) {
      source.status = "Searching for mate"
      let arr = this.createOrgArray(source, orgObjs)
      if (arr.length) {
        this.physics.moveToObject(source, arr[0], source.speed)
        // this.checkClosestMoveTo(source, arr, true)
      }
    } else {
      source.status = "Searching for food"
      this.checkClosestMoveTo(source, foodObjs, false)
    }
  }

  createOrgArray(source, orgObjs) {
    let arr = [];
    for (const org of orgObjs) {
      if (source.distanceBetweenPerceived(org) && org.sex === 1) {
        arr.push(org)
      }
    }
    //Sorts by the highest scoring sex1's
    arr.sort((a, b) => b.score - a.score)
    return arr
  }

  //if search alg reveals nothing in perception distance and 
  movementFunc(org) {
    let orgSpeed = Math.sqrt(org.body.velocity.x**2 + org.body.velocity.y**2)
    // console.l og(orgSpeed, org.speed)
   
    if ((org.status === "Searching for food" || org.status === "Searching for mate") &&  ((orgSpeed / org.speed) < 0.7)) {
        org.resetSpeed();
      }
  }

  //If false, then it will only move to whatever is in its perception distance, otherwise it will move to the closest
  checkClosestMoveTo(source, objects, bool) {
    if (objects.length) {
      let closest = this.physics.closest(source, objects)
      if (bool) {
        this.physics.moveToObject(source, closest, source.speed)
        return
      }
      if (source.distanceBetweenPerceived(closest)) {
        this.physics.moveToObject(source, closest, source.speed)
      }
    }
    return
  }

  consoleLog(pointer, gameObject) {
    console.log(gameObject.id)
  }

  //document.querySelector("#rolum") 
  writeAttributes(pointer, gameObject) {
    if (!(gameObject instanceof Org) && pointer.downElement.toString() === "[object HTMLCanvasElement]") {
      document.querySelector(".rightSidebarItems").innerHTML = ""
      return
    } else if (pointer.downElement.toString() === "[object HTMLCanvasElement]") {
      document.querySelector(".rightSidebarItems").innerHTML = ""

      let rsElem = document.querySelector(".rightSidebarItems")
      let attrList = document.createElement("span")
      attrList.innerHTML = ` 
      <ul id="attrList">
        <li>Score: ${gameObject.score} </li>
        <li>Status: ${gameObject.status} </li>
        <li>Age: ${gameObject.age} </li> 
        <li id="orgID" value="${gameObject.id}">ID: ${gameObject.id}</li>
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
        <li>Type: ${gameObject.sex} </li>
        <li>Generation: ${gameObject.generation} </li>
        <li>Parents: ${gameObject.parent1} ${gameObject.parent2}</li>
        <li>Ageless: ${gameObject.ageless} </li>
        <li>Invincible: ${gameObject.invincible} </li>
        <button class="rightSidebarButtons" name="agelessToggle">Toggle Ageless</button>
        <li>   </li>
        <button class="rightSidebarButtons" name="invincibleToggle">Toggle Invincible</button>
      </ul>
      `
      Phaser.DOM.AddToDOM(attrList, rsElem)
    }
  }

  addOrg() {
    let addedOrg = new Org(this, Phaser.Math.Between(20, this.game.config.width), Phaser.Math.Between(20, this.game.config.height), null, null, this.orgNum)
    this.orgNum++;
    if (addedOrg.predator  && document.querySelector("#predatorToggle").checked) {
      addedOrg.setTexture("predator")
      addedOrg.play("pred_anim")
    }
    addedOrg.setInteractive();
    this.input.setDraggable(addedOrg)
    addedOrg.setDepth(2)
  }

  addFood(foodData) {
    let newFood1 = new Food(this, Phaser.Math.Between(20, this.game.config.width), Phaser.Math.Between(20, this.game.config.height), foodData[Phaser.Math.Between(0, 4)])
    newFood1.setInteractive();
    this.input.setDraggable(newFood1)
    newFood1.setDepth(0)
  }

  // getFoodData = async function () {
  //   return axios.get("https://agile-scrubland-73485.herokuapp.com/foods")
  //     .then((res) => {
  //       return res.data;
  //     })
  //     .catch((err) => console.log(err.message));
  // }
  damageTexture(org, health, damageBool) {
    if (!damageBool && health < (org.max_health / 2)) {
      org.setTexture("damage")
      org.play("damage_anim")
      org.isShowingDamage = true
    }
  }
  regTexture(org, health, damageBool) {
    if (damageBool && health > (org.max_health / 2)) {
      if (org.predator && document.querySelector("#predatorToggle").checked) {
        org.setTexture("gp")
        org.play("gp_anim")
      } else {
        if(org.sex === 1) {
          org.play("bb_anim");
          org.setTexture("bb")
        } else {
          org.play("gb_anim");
          org.setTexture("gb")
        }
      }
      org.isShowingDamage = false
    }
  }
  predTexture(org) {
      if (org.predBool && document.querySelector("#predatorToggle").checked) {
        org.setTexture("gp")
        org.play("gp_anim")
        org.predBool = false
      } else if (!org.predBool && !document.querySelector("#predatorToggle").checked) {
        if(org.sex === 1) {
          org.play("bb_anim");
          org.setTexture("bb")
        } else {
          org.play("gb_anim");
          org.setTexture("gb")
        }
          org.predBool = true
        }
  }
  attackOrSpawn(org1, org2) {
    if(document.querySelector("#predatorToggle").checked){
      if (org1.predator && !org2.predator && org2.health < (org2.max_health / 2) && org2.damageCycle > 300) {
          console.log("got damaged")
          org2.health -= 5;
          org2.damageCycle = 0;
          org1.health += 5;
          let collision = new Explosion(this, org1.x, org1.y)
          return
      } else if (org1.predator && !org2.predator && org2.health > (org2.max_health / 2) && org2.speedBoost > 50 && org2.damageCycle > 300) {
          console.log("ran away!")
          org2.setVelocity(org2.velx + 50, org2.vely + 50)
          org2.speedBoost = 0;
          org2.damageCycle = 0;
          return
      } else if (org2.predator && !org1.predator && org1.health < (org1.max_health / 2) && org1.damageCycle > 300) {
          org1.health -= 5;
          org2.health += 5;
          console.log("got damaged")
          org1.damageCycle = 0;
          let collision = new Explosion(this, org1.x, org1.y)
          return
      } else if (org2.predator && !org1.predator && org1.health < (org1.max_health / 2) && org2.speedBoost > 50 && org1.damageCycle > 300) {
          org1.setVelocity(org1.velx + 50, org1.vely + 50)
          org1.speedBoost = 0;
          console.log("ran away")
          org1.damageCycle = 0;
          return
      } else if (this.breedingCheck(org1, org2) && org1.reproductionCycle >= 300 && org2.reproductionCycle >= 300) {
          org1.status = "Breeding"
          org2.status = "Breeding"
          let sex1 = this.orderSexes(org1, org2)[0]
          sex1.energy -= 50

        for (let i = 0; i < sex1.litter_size; i++) {
          const randomX = Phaser.Math.Between(-5, 5)
          const randomY = Phaser.Math.Between(-5, 5)
          let newOrg = new Org(this, org1.x + randomX, org1.y + randomY, org1, org2, this.orgNum)
          this.orgNum++
          newOrg.setInteractive();
          this.input.setDraggable(newOrg)
          newOrg.setDepth(2)
        }
        org1.reproductionCycle = 0;
        org2.reproductionCycle = 0;
        org1.setVelocity(0, 0);
        org2.setVelocity(0, 0);

        this.time.addEvent({
          delay: 1000,
          callback: function () {
            org1.resetSpeed();
            org2.resetSpeed();
          },
          callbackScope: this,
          loop: false
        })
      }
    } else {
      if (this.breedingCheck(org1, org2) && org1.reproductionCycle >= 300 && org2.reproductionCycle >= 300) {
        org1.status = "Breeding"
        org2.status = "Breeding"
        let sex1 = this.orderSexes(org1, org2)[0]
        sex1.energy -= 50

        for (let i = 0; i < sex1.litter_size; i++) {
          const randomX = Phaser.Math.Between(-5, 5)
          const randomY = Phaser.Math.Between(-5, 5)
          let newOrg = new Org(this, org1.x + randomX, org1.y + randomY, org1, org2, this.orgNum)
          this.orgNum++
          newOrg.setInteractive();
          this.input.setDraggable(newOrg)
          newOrg.setDepth(2)
        }
        org1.reproductionCycle = 0;
        org2.reproductionCycle = 0;
        org1.setVelocity(0, 0);
        org2.setVelocity(0, 0);

        this.time.addEvent({
          delay: 1000,
          callback: function () {
            org1.resetSpeed();
            org2.resetSpeed();
          },
          callbackScope: this,
          loop: false
        })
      }
    }
  }

  orderSexes(org1, org2) {
    return (org1.sex < org2.sex ? [org1, org2] : [org2, org1])
  }

  breedingCheck(org1, org2) {
    let [sex1, sex2] = this.orderSexes(org1, org2)
    if (sex1.sex === sex2.sex) {
      return false
    } else if (sex2.score - sex1.score > -450 && sex1.age >= sex1.breeding_age && sex2.age >= sex2.breeding_age && sex2.energy && (sex2.energy / sex2.max_energy) * 100 >= 50 && (sex2.health / sex2.max_health) * 100 >= 75 && (sex1.energy / sex1.max_energy) * 100 >= 50 && (sex1.health / sex1.max_health) * 100 >= 75) {
      return true
    } else {
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

  dyingOrg(org) {
    org.status = "Dying:"
    this.time.addEvent({
      delay: 1000,
      callback: function () {
        org.dying();

        if (org.scale <= 0) {
          org.destroy();
        }
      },
      callbackScope: this,
      repeat: 6
    });
  }

  onSave = async function (orgs, foods, blocks, iterations) {
    const cookieArr = document.cookie.split(';');
    let gameID = null;
    for (let cookie of cookieArr) {
      if (cookie.includes('game_id')) {
        gameID = cookie.slice(9);
      }
    }
    if (gameID) {
      this.physics.pause();
      let savingMessage = this.add.text(this.game.config.width / 3, this.game.config.height / 4, 'Saving...', { color: "#000000", fontSize: 100 })
      let gameStateObject = {
        orgs: [],
        foods: [],
        blocks: [],
        iterations: iterations
      };

      if (orgs.length) {
        orgs.forEach((org) => {
          gameStateObject.orgs.push(org.getAttributes());
        })
      }

      if (foods.length) {
        foods.forEach((food) => {
          gameStateObject.foods.push(food.getAttributes());
        })
      }

      if (blocks.length) {
        blocks.forEach((block) => {
          let blockRotation = 0;
          if(block._rotation < 0){
            blockRotation = -40
          }
          if(block._rotation > 0){
            blockRotation = 40
          }
          gameStateObject.blocks.push({x: block.x, y: block.y, texture: block.texture.key, rotation: blockRotation });
        })
      }

      gameStateObject = JSON.stringify(gameStateObject);

      let newGameBool = await this.newGame(gameID);

      if (newGameBool) {
        console.log("UPDATING SAVE");
        const gameSaveUrl = `https://agile-scrubland-73485.herokuapp.com/game_saves/${gameID}`;

        axios({
          method: 'PUT',
          url: `https://agile-scrubland-73485.herokuapp.com/game_saves/${gameID}`,
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
        const gameSaveUrl = `https://agile-scrubland-73485.herokuapp.com/game_saves`;

        let gameData = {
          game_id: gameID,
          save_text: gameStateObject
        };

        axios({
          method: 'POST',
          url: `https://agile-scrubland-73485.herokuapp.com/game_saves`,
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
        url: `https://agile-scrubland-73485.herokuapp.com/games/${gameID}`,
        data: gameStats,
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(resp => {
          console.log("Updated successfully for games:", resp);
          savingMessage.destroy();
          this.physics.resume();
        })
        .catch(err => console.log("Error attempting to save:", err.message));
    }
  }

  newGame = async function (gameID) {
    return axios.get(`https://agile-scrubland-73485.herokuapp.com/game_saves/${gameID}`)
      .then((res) => {
        console.log("newGame then", res);
        return true;
      })
      .catch((err) => {
        if (err.message === "Request failed with status code 404") {
          return false;
        }
      })
  }

  getGameData = async function (gameID) {
    return axios.get(`https://agile-scrubland-73485.herokuapp.com/game_saves/${gameID}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err.message))
  }

  getHighestScoreDB
}

export default TitleScene;
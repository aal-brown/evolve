import Phaser from "phaser";

export default class Preload extends Phaser.Scene {
  constructor() {
    super("preloadAssets")
  }

  preload() {
    this.load.image('sky', '/assets/sky.png');
    this.load.image('ground', '/assets/platform.png');
    this.load.image('star', '/assets/star.png');
    
    this.load.spritesheet("blobs", "assets/blobs.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("damage", "assets/damage.png", {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet("mushy peas", "/assets/food1.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("chicken", "/assets/food2.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("chocolate", "/assets/food3.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("pasta", "/assets/food4.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("raspberries", "/assets/food5.png", {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.image('fullscreen',"assets/fullscreen2.png")
    this.load.image('minimize',"assets/minimize2.png")
    this.load.image('toggle-ls',"assets/menu-icon.png")

    this.load.html("buttons", "/assets/html/buttons.html");
    this.load.html("right-sidebar", "/assets/html/right-sidebar.html");

    this.load.on("progress", () => {
      this.add.text(20, 20, "Loading game...")
    })

    this.load.on("complete", () => {
      this.scene.start("TitleScene")
    });


  }
  create() {
    this.anims.create({
      key: "blobs_anim",
      frames: this.anims.generateFrameNumbers("blobs"),
      frameRate: 10,
      repeat: -1 //means infinite loop!
    });
    this.anims.create({
      key: "damage_anim",
      frames: this.anims.generateFrameNumbers("damage"),
      frameRate: 10,
      repeat: -1 //means infinite loop!
    });
  }
}

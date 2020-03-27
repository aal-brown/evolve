import Phaser from "phaser";

export default class Preload extends Phaser.Scene {
  constructor() {
    super("preloadAssets")
  }

  preload() {
    this.load.image('sky', '/assets/sky.png');
    this.load.image('ground', '/assets/platform.png');
    this.load.image('star', '/assets/star.png');
    this.load.image('platforms', '/assets/platform.png');
    this.load.image('rock', '/assets/rock.png');
    this.load.image('rock2', '/assets/rock2.png');
    this.load.image('bush1', '/assets/bush1.png');
    this.load.image('bush2', '/assets/bush2.png');
    this.load.image('moon', '/assets/moon2-r1.png');
    

    this.load.audio("main_theme","assets/music/main-theme-back34.mp3")
    
    this.load.spritesheet("blobs", "assets/blobs.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("damage", "/assets/damaged-new-r1.png", {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet("banana", "/assets/fruit-lm-0.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("tomato", "/assets/fruit-lm-1.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("watermelon", "/assets/fruit-lm-2.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("kiwi", "/assets/fruit-lm-3.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("strawberry", "/assets/fruit-lm-4.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("explosion", "/assets/explosion2.png", {
      frameWidth: 100,
      frameHeight: 100
    });

    this.load.spritesheet("bb", "/assets/bb-sprite-sheet.png", {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet("gb", "/assets/gb-sprite-sheet.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("gp", "/assets/gp-sprite-sheet.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    

    this.load.image('fullscreen',"assets/fullscreen2.png")
    this.load.image('minimize',"assets/minimize2.png")
    this.load.image('toggle-ls',"assets/menu-icon.png")

    this.load.html("buttons", "/assets/html/buttons.html");
    this.load.html("save-and-seed", "/assets/html/save-and-seed.html");
    this.load.html("right-sidebar", "/assets/html/right-sidebar.html");

    this.load.image('block', 'assets/block.png')
    this.load.image('platLangle', 'assets/platform-langle.png')
    this.load.image('platRangle', 'assets/platform-rangle.png')
    this.load.image('platVert', 'assets/platform-vert.png')
    this.load.image('platHoriz', 'assets/platform-horiz.png')
    this.load.image('circle', 'assets/black-circle.png')

    this.load.image("volume-on", "assets/volume-on.png")
    this.load.image("volume-mute", "assets/volume-mute.png")

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
      key: "bb_anim",
      frames: this.anims.generateFrameNumbers("bb"),
      frameRate: 10,
      repeat: -1 //means infinite loop!
    });
    this.anims.create({
      key: "gb_anim",
      frames: this.anims.generateFrameNumbers("gb"),
      frameRate: 10,
      repeat: -1 //means infinite loop!
    });
    this.anims.create({
      key: "gp_anim",
      frames: this.anims.generateFrameNumbers("gp"),
      frameRate: 10,
      repeat: -1 //means infinite loop!
    });
    this.anims.create({
      key: "damage_anim",
      frames: this.anims.generateFrameNumbers("damage"),
      frameRate: 4,
      repeat: -1 //means infinite loop!
    });
    this.anims.create({
      key: "pred_anim",
      frames: this.anims.generateFrameNumbers("gp"),
      frameRate: 10,
      repeat: -1 //means infinite loop!
    });
    this.anims.create({
      key: "explosion_anim",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 80,
      repeat: 0
    });
  }
}

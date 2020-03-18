import Phaser from "phaser";



export default class Preload extends Phaser.Scene {
  constructor() {
    super("preloadAssets")
  }

  preload() {
    
    this.load.image('sky', '/assets/sky.png');
    this.load.image('ground', '/assets/platform.png');
    //this.load.image('star', '/assets/star.png');
    
    this.load.spritesheet("blobs", "assets/blobs.png", {
      frameWidth: 32,
      frameHeight: 32
    })

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
   }
}

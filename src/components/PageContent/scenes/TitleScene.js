import Phaser from "phaser";
import Org from "./Org";

let iterations = 0;

class TitleScene extends Phaser.Scene {

  constructor() {
    super('TitleScene')
  }

  create() {
    // this.gameTime = new Phaser.Timer(this);

    this.add.image(400, 300, 'sky');
    this.orgs = this.physics.add.group();

    this.r1 = new Org(this, 400, 200, iterations, 50, 60)
    this.r2 = new Org(this, 400, 400, iterations, 100, 100)
    this.r3 = new Org(this, 400, 600, iterations, 25, 35)
    this.r4 = new Org(this, 200, 400, iterations, 10, 20)
    this.r5 = new Org(this, 400, 400, iterations, 20, 30)
    this.r6 = new Org(this, 600, 400, iterations, 3, 4)

    this.physics.add.overlap(this.orgs, this.orgs, this.spawn, null, this);
  }

  update() {
    for(let i = 0; i < this.orgs.getChildren().length; i++){
      let org = this.orgs.getChildren()[i]
      org.reproductionCycle++;
      org.age++;
      org.grow();
      
      if(org.age > 2000) {
        org.setVelocity(0,0);
        this.orgs.remove(org, false, false)
        this.dyingOrg(org);
        }
    }

    iterations++;
    if (iterations % 20 === 0 ) {
      console.log(this.orgs.getChildren().length)
    }

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
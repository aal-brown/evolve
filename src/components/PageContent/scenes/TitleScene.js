import Phaser from "phaser";
import Org from "./Org";
//import Org from "./Org"

const delay = 5
let iterations = 0;

class TitleScene extends Phaser.Scene {

  constructor() {
    super('TitleScene')
  }

  create() {

    this.add.image(400, 300, 'sky');
    
  
    this.orgs = this.physics.add.group();
    this.orgs.setCollideWorldBounds(true);
    

    // platforms = this.physics.add.staticGroup();

    // platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    this.r4 = new Org(this, 200, 400, iterations)
    this.r5 = new Org(this, 400, 400, iterations)
    this.r6 = new Org(this, 600, 400, iterations)
    this.r1 = new Org(this, 400, 200, iterations)
    this.r2 = new Org(this, 400, 400, iterations)
    this.r3 = new Org(this, 400, 600, iterations)

   
    // this.r1.setScale(2)
    // this.r2.setScale(2)
    // this.r3.setScale(2)
    // this.r4.setScale(2)
    // this.r5.setScale(2)
    // this.r6.setScale(2)
    // this.orgs.add(this.r1)
    // this.orgs.add(this.r2)
    // this.orgs.add(this.r3)
    // this.orgs.add(this.r4)
    // this.orgs.add(this.r5)
    // this.orgs.add(this.r6)

    // this.r1.setCollideWorldBounds(true)
    // this.r2.setCollideWorldBounds(true)
    // this.r3.setCollideWorldBounds(true)
    // this.r4.setCollideWorldBounds(true)
    // this.r5.setCollideWorldBounds(true)
    // this.r6.setCollideWorldBounds(true)
    // this.r1.play("blobs_anim");
    // this.r2.play("blobs_anim");
    // this.r3.play("blobs_anim");
    // this.r4.play("blobs_anim");
    // this.r5.play("blobs_anim");
    // this.r6.play("blobs_anim");

    this.physics.add.collider(this.orgs, this.orgs, this.spawn, null, this); 
    
    //  WebGL only

    // this.physics.add.collider(this.r1, platforms);
    // this.physics.add.collider(this.r2, platforms);
    // this.physics.add.collider(this.r3, platforms);
    // this.physics.add.collider(this.r4, platforms);
    // this.physics.add.collider(this.r5, platforms);
    // this.physics.add.collider(this.r6, platforms);

    
    // this.tweens.add({

    //   targets: r3,
    //   scaleX: 0.25,
    //   scaleY: 0.5,
    //   yoyo: true,
    //   repeat: -1,
    //   ease: 'Sine.easeInOut'

    // });

  }
  spawn(org1, org2){
    if(iterations - org1.age > 500 && iterations - org2.age > 500 && org1.reproductionCycle >= 300 && org2.reproductionCycle >= 300){
      console.log("inside spawn")
      const randomX = Phaser.Math.Between(0, 600)
      const randomY = Phaser.Math.Between(0, 800)
      let newOrg = new Org(this, randomX, randomY, iterations)
      org1.reproductionCycle = 0;
      org2.reproductionCycle = 0;
    }
  }

  update() {
    if (!(iterations % delay)) { //This is used to "slow down" the animation
      //The clearing has to be done BEFORE the item generation, otherwise it won't work
      /* generateItems(items); */
      for(let i=0; i< this.orgs.getChildren().length; i++){
        let org = this.orgs.getChildren()[i]
        org.x = org.x + Phaser.Math.Between(-10, 10)
        org.y = org.y + Phaser.Math.Between(-10, 10)
        org.reproductionCycle += 5;
      }
      //allCells = [ ...arr, ...arr2]
      //console.log(context.getImageData(101, 201, 2, 2).data[0])
    }
    iterations++;
    //console.log(arr)
    //console.log(iterations)

console.log(this.r1.reproductionCycle, "reprod")
  }


}


export default TitleScene;
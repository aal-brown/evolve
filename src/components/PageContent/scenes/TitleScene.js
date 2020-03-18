import Phaser from "phaser";
let platforms;

var r1;
var r2;
var r3;
var r4;
var r5;
var r6;
const delay = 5
let iterations = 0;

class TitleScene extends Phaser.Scene {


  constructor() {
    super('TitleScene')
  }

  create() {

    this.add.image(400, 300, 'sky');
    
    this.blobs = this.add.sprite( 300, 300, "blobs")
    this.blobs.play("blobs_anim");


    // platforms = this.physics.add.staticGroup();

    // platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    r4 = this.physics.add.sprite(200, 200, 'blobs');
    r5 = this.physics.add.sprite(400, 200, 'blobs');
    r6 = this.physics.add.sprite(600, 200, 'blobs');
    r1 = this.physics.add.sprite(200, 400, 'blobs');
    r2 = this.physics.add.sprite(400, 400, 'blobs');
    r3 = this.physics.add.sprite(600, 400, 'blobs');


    r1.setScale(2)
    r2.setScale(2)
    r3.setScale(2)
    r4.setScale(2)
    r5.setScale(2)
    r6.setScale(2)
 
this.blobs.setScale(2)
    r1.setCollideWorldBounds(true)
    r2.setCollideWorldBounds(true)
    r3.setCollideWorldBounds(true)
    r4.setCollideWorldBounds(true)
    r5.setCollideWorldBounds(true)
    r6.setCollideWorldBounds(true)
    r1.play("blobs_anim");
    r2.play("blobs_anim");
    r3.play("blobs_anim");
    r4.play("blobs_anim");
    r5.play("blobs_anim");
    r6.play("blobs_anim");


    
    //  WebGL only

    this.physics.add.collider(r1, platforms);
    this.physics.add.collider(r2, platforms);
    this.physics.add.collider(r3, platforms);
    this.physics.add.collider(r4, platforms);
    this.physics.add.collider(r5, platforms);
    this.physics.add.collider(r6, platforms);

    // this.tweens.add({

    //   targets: r4,
    //   scaleX: 0.25,
    //   scaleY: 0.5,
    //   yoyo: true,
    //   repeat: -1,
    //   ease: 'Sine.easeInOut'

    // });

    // this.tweens.add({

    //   targets: r5,
    //   scaleX: 0.25,
    //   scaleY: 0.5,
    //   yoyo: true,
    //   repeat: -1,
    //   ease: 'Sine.easeInOut'

    // });

    // this.tweens.add({

    //   targets: r6,
    //   scaleX: 0.25,
    //   scaleY: 0.5,
    //   yoyo: true,
    //   repeat: -1,
    //   ease: 'Sine.easeInOut'

    // });

    // this.tweens.add({

    //   targets: r1,
    //   scaleX: 0.25,
    //   scaleY: 0.5,
    //   yoyo: true,
    //   repeat: -1,
    //   ease: 'Sine.easeInOut'

    // });

    // this.tweens.add({

    //   targets: r2,
    //   scaleX: 0.25,
    //   scaleY: 0.5,
    //   yoyo: true,
    //   repeat: -1,
    //   ease: 'Sine.easeInOut'

    // });

    // this.tweens.add({

    //   targets: r3,
    //   scaleX: 0.25,
    //   scaleY: 0.5,
    //   yoyo: true,
    //   repeat: -1,
    //   ease: 'Sine.easeInOut'

    // });


  }


  update() {
    if (!(iterations % delay)) { //This is used to "slow down" the animation
      //The clearing has to be done BEFORE the item generation, otherwise it won't work
      /* generateItems(items); */
      r1.x = r1.x + Phaser.Math.Between(-5, 5)
      r1.y = r1.y + Phaser.Math.Between(-5, 5)
      r2.x = r2.x + Phaser.Math.Between(-5, 5)
      r2.y = r2.y + Phaser.Math.Between(-5, 5)
      r3.x = r3.x + Phaser.Math.Between(-5, 5)
      r3.y = r3.y + Phaser.Math.Between(-5, 5)
      r4.x = r4.x + Phaser.Math.Between(-5, 5)
      r4.y = r4.y + Phaser.Math.Between(-5, 5)
      r5.x = r5.x + Phaser.Math.Between(-5, 5)
      r5.y = r5.y + Phaser.Math.Between(-5, 5)
      r6.x = r6.x + Phaser.Math.Between(-5, 5)
      r6.y = r6.y + Phaser.Math.Between(-5, 5)
      //allCells = [ ...arr, ...arr2]
      //console.log(context.getImageData(101, 201, 2, 2).data[0])
    }
    iterations++;
    //console.log(arr)
    //console.log(iterations)


  }


}


export default TitleScene;
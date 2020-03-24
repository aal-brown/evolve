import Phaser from "phaser";
class Food extends Phaser.GameObjects.Sprite {
  
  constructor(scene, x, y, foodName) {
    super(scene, x, y, foodName);
    this.nameStr = foodName;
    this.energy = 4000;
    this.x = x;
    this.y = y;
    scene.add.existing(this)
    scene.physics.world.enableBody(this);
    scene.foods.add(this);
  }

  getAttributes() {
    let attributeObject = {
      nameStr: this.nameStr,
      energy: this.energy,
      x: this.x,
      y: this.y
    };

    return attributeObject;
  }
}

export default Food;
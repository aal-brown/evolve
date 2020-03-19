import Phaser from "phaser";
class Food extends Phaser.GameObjects.Sprite {
  
  constructor(scene, x, y, foodObj) {
    super(scene, x, y, foodObj.name);
    this.nameStr = foodObj.name;
    this.energy = foodObj.energy_level
    scene.add.existing(this)
    scene.physics.world.enableBody(this);
    scene.foods.add(this);
  }
}

export default Food;
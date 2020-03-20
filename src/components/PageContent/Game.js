import React, {
  Component, useState
} from 'react'
import Phaser from 'phaser'
import {
  IonPhaser
} from '@ion-phaser/react'
import Preload from "./scenes/preload";
import TitleScene from './scenes/TitleScene';
import LeftSideBar from './LeftSideBar.js'

//let canvas = document.querySelector('canvas');
//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;

class Game extends Component {
  state = {
    initialize: true,
    game: {
      width: window.innerWidth,
      height: window.innerHeight,
      parent: 'game-container',
      type: Phaser.AUTO,
      physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0,
              enableBody: true
             }
        }
    },
    scale: {
      mode: Phaser.Scale.FIT,
    },
    scene: [Preload, TitleScene],
    }
  }

  render() {
     const addOrg = function() { 
      console.log("Add Organism") };
    const addFood = function() { 
      console.log("Add Food") };
    const changeTemp = function() { 
      console.log("Change Temp") };
    const save = function() { 
      console.log("Save") };
    const getSeed = function() { 
      console.log("Get Seed") };
    const {
      initialize,
      game
    } = this.state
    return (
      <div id="game-container">
      <IonPhaser game = {
        game
      }
      initialize = {
        initialize
      }
      />
      < LeftSideBar
       addOrg = {addOrg}
       addFood = {addFood}
       changeTemp = {changeTemp}
       save = {save}
       getSeed = {getSeed}
        />
      </div>
    )
  }
}

export default Game;

import React, {
  Component
} from 'react'
import Phaser from 'phaser'
import {
  IonPhaser
} from '@ion-phaser/react'
import Preload from "./scenes/preload";
import TitleScene from './scenes/TitleScene';
class Game extends Component {
  state = {
    initialize: true,
    game: {
      width: 800,
      height: 600,
      parent: 'game-container',
      type: Phaser.AUTO,
      physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scale: {
      mode: Phaser.Scale.FIT,
    },
    scene: [Preload, TitleScene]
    }
  }

  render() {
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
      </div>
    )
  }
}

export default Game;

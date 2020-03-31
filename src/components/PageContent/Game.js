import React, {
  Component, useState
} from 'react'
import Phaser from 'phaser'
import {
  IonPhaser
} from '@ion-phaser/react'
import Preload from "./scenes/preload";
import TitleScene from './scenes/TitleScene';
import Button from '../Button';
import ReactJoyride, {ACTIONS, EVENTS, STATUS} from 'react-joyride';
import "../../styles/variables.scss";

// import LeftSideBar from './LeftSideBar.js'

//let canvas = document.querySelector('canvas');
//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;

class Game extends Component{
  state = {
    initialize: true,
    game: {
      width: window.innerWidth - 10,
      height: window.innerHeight - 10,
      backgroundColor: 0xFFD966,
      parent: 'game-container',
      type: Phaser.CANVAS,
      physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0,
              enableBody: true
             }
        }
    },
    dom: {
      createContainer: true
    },
    scale: {
      mode: Phaser.Scale.FIT,
    },
    scene: [Preload, TitleScene],
    },
    run: false,
    stepIndex: 0, // a controlled tour
    steps: [
        {
          content: <h3> Greetings from your colony of orgs! They will evolve before your very eyes!</h3>,
          locale: { skip: <strong aria-label="skip">Skip Tour</strong> },
          placement: 'center',
          target: 'body',
          scrollToSteps: false
        }, 
        {
          content: <h4>Clicking here lets you add more orgs into your colony</h4>,
          locale: { skip: <strong aria-label="skip">Skip Tour</strong> },
          target: '#feature0',
          placement: 'top-start',
          scrollToSteps: false
        }, 
        {
          content: <h4>Here you can add food randomly or 'on click' using the feed toggle.</h4>,
          locale: { skip: <strong aria-label="skip">Skip Tour</strong> },
          target: '#feature1',
          placement: 'top-start'
        }, 
        {
          content: <h4>When you start the game you're in draggable mode, this lets you move orgs food and blocks around the page just by dragging them.</h4>,
          locale: { skip: <strong aria-label="skip">Skip Tour</strong> },
          target: '#feature0n',
          placement: 'top-start'
        }, 
        {
          content: <h4>Here you can add barriers, rocks and foliage and build walls around your favourite orgs 'on click' wherever you want inside your colony using the blocks toggle. </h4>,
          locale: { skip: <strong aria-label="skip">Skip tour</strong> },
          target: '#feature2',
          placement: 'top-start'
        },
        {
          content: <h4> You can delete orgs, food and blocks with the delete toggle.</h4>,
          locale: { skip: <strong aria-label="skip">Skip tour</strong> },
          target: '#feature9',
          placement: 'top-start'
        },  
        {
          content: <h4>You can turn on predator mode allowing the predatory orgs to attack their weaker brethren! </h4>,
          locale: { skip: <strong aria-label="skip">Skip Tour</strong> },
          target: '#feature3',
          placement: 'top-start'
        }, 
        
        {
          content: <h4>Here you can draw on the Org-world and keep a note about your favourite Ors, or just add some decoration! </h4>,
          locale: { skip: <strong aria-label="skip">Skip Tour</strong> },
          target: '#feature10',
          placement: 'top-start'
        }, 
        
        {
          content: <h4>Once signed in you can save your game and return to the most recent saved state by clicking load in your games table.</h4>,
          locale: { skip: <strong aria-label="skip">Skip tour</strong> },
          target: '#feature4',
          placement: 'center'
        }, 
        {
          content: <h4>At the top of the org-world see your highest score, average score and number of orgs and watch your orgs evolve in real time!</h4>,
          locale: { skip: <strong aria-label="skip">Skip tour</strong> },
          target: '#feature5',
          placement: 'center'
        }, 
        {
          content: <h4>Clicking on an org lets you see all his/her attributes</h4>,
          locale: { skip: <strong aria-label="skip">Skip tour</strong> },
          target: '#feature6',
          placement: 'center'
        }, 
        {
          content: <h4>Over here you can mute/play the music.</h4>,
          locale: { skip: <strong aria-label="skip">Skip tour</strong> },
          target: '#feature7',
          placement: 'top-end'
        }, 
        {
          content: <h4>Have fun and watch your colony thrive! If you have any more questions checkout the guide in the nav-bar!</h4>,
          locale: { skip: <strong aria-label="skip">Skip tour</strong> },
          target: '#feature8',
          placement: 'center'
        }, 
      ] 
  }

  handleClick = e => {
    e.preventDefault();
    
    this.setState({
     run: true
    });
  };
  handleJoyrideCallback = data => {
    const { action, index, status, type } = data;

    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      // Update state to advance the tour
      this.setState({ stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) });
    }
    else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      this.setState({ run: false });
    }

    console.groupCollapsed(type);
    console.log(data); //eslint-disable-line no-console
    console.groupEnd();
  };

  
  
  
  render() {

    const {
      initialize,
      game, 
      steps,
      run, 
      scrollToSteps,
      scrollOffset
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
      <div id="test"></div>
      <div style={{position: 'absolute',
  top: '13.5em',
  left: '12em'}} onClick={this.handleClick}><Button>Tour</Button></div>
      <div id="feature0" style={{position: 'relative',
  top: '2.4em',
  left: '7em'}}></div>
      <div id="feature0n" style={{position: 'relative',
  top: '6.4em',
  left: '7em'}}></div>
      <div id="feature1" style={{position: 'relative',
  top: '4.4em',
  left: '7em'}}></div>
      <div id="feature2" style={{position: 'relative',
  top: '10.4em',
  left: '7em'}}></div>
      <div id="feature3" style={{position: 'relative',
  top: '14.4em',
  left: '7em'}}></div>
      <div id="feature10" style={{position: 'relative',
  top: '18.7em',
  left: '7em'}}></div>
      <div id="feature9" style={{position: 'relative',
  top: '12.4em',
  left: '7em'}}></div>
      <div id="feature4" style={{position: 'relative',
  top: '10.4em',
  left: '7em'}}></div>
      <div id="feature5" style={{position: 'relative',
  top: '2.4em',
  left: '50%'}}></div>
      <div id="feature6" style={{position: 'relative',
  top: '2.4em',
  left: '50%'}}></div>
      <div id="feature7" style={{position: 'relative',
  top: '0em',
  left: '95%'}}></div>
      <div id="feature8" style={{position: 'relative',
  top: '2.4em',
  left: '7em'}}></div>
      <ReactJoyride steps={steps} run={run} disableScrolling={true} continuous={true} showSkipButton={true} disableOverlay={true} callback={this.handleJoyrideCallback} styles={{
            options: {
              arrowColor: '#fff',
              backgroundColor: 'rgb(123, 201, 158)',
              primaryColor: '#3CB371',
              textColor: '#fff',
              width: 500,
              zIndex: 1000,
            }
          }}/>
      </div>
    )
  }
}

export default Game;

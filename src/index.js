import WelcomeScreen from "./comp/WelcomeScreen.js"
import GamePlayScreen from "./comp/GamePlayScreen.js"
import EventCenter from './comp/EventCentre'
import UiScene from './comp/UiScene'

var config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 500,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 200 },
          debug: true
      }
  },
  scene: [ WelcomeScreen, GamePlayScreen, UiScene, EventCenter ]
}

var game = new Phaser.Game(config)

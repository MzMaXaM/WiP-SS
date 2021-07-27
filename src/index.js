import WelcomeScreen from "./comp/WelcomeScreen"
import GamePlayScreen from "./comp/GamePlayScreen"
import GameOver from "./comp/GameOverScreen"
import EventCenter from "./comp/EventCentre"
import UiScene from "./comp/UiScene"

var config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 500,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 385 },
          debug: true
      },
      matter: {
          gravity: { y: 0.5 },
          debug: true
      }
  },
  scene: [ GamePlayScreen, WelcomeScreen, UiScene, EventCenter, GameOver ]
}

var game = new Phaser.Game(config)
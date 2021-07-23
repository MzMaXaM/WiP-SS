import WelcomeScreen from "./comp/WelcomeScreen.js"
import GamePlayScreen from "./comp/GamePlayScreen.js"

var config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 500,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 200 }
      }
  },
  scene: [WelcomeScreen, GamePlayScreen]
}

var game = new Phaser.Game(config)

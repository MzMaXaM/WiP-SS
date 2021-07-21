import TestScene from "./comp/TestScene.js"

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 200 }
      }
  },
  // scene: {
  //     preload: preload,
  //     create: create
  // }
}

var game = new Phaser.Game(config)

// function preload ()
// {
//     this.load.image('logo', './assets/logo.png')
//     this.load.image('play', './assets/play.png')
// }

// function create ()
// {
//     var logo = this.add.image(400, 200, 'logo')
//     var play = this.add.image(400, 300, 'play')
// }
game.scene.add('TestScene', TestScene)
game.scene.start('TestScene')


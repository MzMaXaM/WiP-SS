import eventsCenter from "./EventCentre"


class GamePlayScreen extends Phaser.Scene
{
    constructor (){
        super({key: 'GamePlayScreen'})
    }

    preload (){
        this.load.image('tileSet', '../../src/assets/yellow64x64.png')
        this.load.image('springBack1', '../../src/assets/bg_spring_Trees_1.png')
        this.load.image('springBack2', '../../src/assets/bg_spring_Trees_2.png')
        this.load.tilemapTiledJSON('FirstMap', '../../src/assets/mapFirst.json')
        this.load.atlas('bCoin', '../../src/assets/bronze_coin.png', '../../src/assets/bronze_coin_atlas.json')
        this.load.atlas('panda', '../../src/assets/panda.png', '../../src/assets/panda_atlas.json')
    }
      
    create (){
        const wit = 780/2
        this.add.image(wit+60, 310, 'springBack1')
        this.add.image(3*wit+60, 310, 'springBack2')
        this.add.image(5*wit+60, 310, 'springBack1')
        this.add.image(7*wit+60, 310, 'springBack2')

        this.createMap()
        this.createPlayer()
        this.createCoin()
        this.createUi()
        this.cursors = this.input.keyboard.createCursorKeys()

        this.cameras.main.setBounds(64,60,8*wit,500)
        this.cameras.main.startFollow(this.player)
    }
    createMap(){
        this.map = this.make.tilemap({ key: 'FirstMap' })
        this.tileset = this.map.addTilesetImage('base64', 'tileSet')
        this.ground = this.map.tilma
        this.ground = this.map.createLayer('Ground', this.tileset)
        this.map.setCollisionByProperty({type: 'c'}, true)
        // this.map.setCollisionByProperty({type: 'c'}, true,true, 'Ground')
        
    }
    createCoin(){
        this.bCoin = this.add.sprite(500, 250, 'bCoin')

        this.anims.create({
            key: 'coin1',
            frames: this.anims.generateFrameNames('bCoin', {
                prefix: 'bronze_coin_round_blank_',
                start: 1,
                end: 6
            }),
            frameRate: 8,
            repeat: -1
        })
        this.bCoin.anims.play('coin1')
    }
    createPlayer(){
        this.player = this.physics.add.sprite(150, 0, 'panda')
        this.player.scale = 0.4
        this.player.setFlipX(true)
        // this.player.setCollideWorldBounds(true)
        this.physics.add.collider(this.player, this.ground)
        this.player.setBounce(0.3)
        this.player.setCircle(105)
        this.player.setOffset(45, 25)

        this.anims.create({
            key: 'playIdle',
            frames: [ { key: 'panda', frame: 'idle' } ],
            frameRate: 1
        })
        this.anims.create({
            key: 'playRun',
            frames: this.anims.generateFrameNames('panda', {
                prefix: 'run_',
                zeroPad: 2,
                start: 1,
                end: 5
            }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'playDead',
            frames: this.anims.generateFrameNames('panda', {
                prefix: 'die_',
                zeroPad: 2,
                start: 1,
                end: 6
            }),
            frameRate: 10
        })


        
        this.keyObj = this.input.keyboard.addKey('D')
    }
    createUi(){
        this.count = 0

        this.scene.run('ui-scene')

        this.keyObj = this.input.keyboard.addKey('W')
        this.keyObj.on('down', () => {
            ++this.count

            eventsCenter.emit('update-count', this.count)
        })

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.keyObj.off('W')
        })
    }


    update (){
        if (this.cursors.down.isDown){
            this.player.play('playDead', true)
        }
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200)
            this.player.setFlipX(false)
            this.player.setOffset(25, 25)
            if (this.player.body.onFloor()) {
                this.player.play('playRun', true)
            }
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200)
            this.player.setFlipX(true)
            if (this.player.body.onFloor()) {
                this.player.play('playRun', true)
            }
        } else {
            this.player.setVelocityX(0)
            if (this.player.body.onFloor()) {
                this.player.play('playIdle', true)
            }
        }
        if (this.cursors.up.isDown && this.player.body.onFloor()) {
            this.player.setVelocityY(-333)
            this.player.play('playIdle', true)
        }

    }
}

export default GamePlayScreen
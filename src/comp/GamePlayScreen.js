import eventsCenter from "./EventCentre.js"

class GamePlayScreen extends Phaser.Scene
{
    constructor (){
        super({key: 'GamePlayScreen'})
    }
//=========================================================================================================
//-----------------------------------------PRELOAD------------------------------------------------------
    preload (){
        this.load.image('tileSet', '../../src/assets/yellow64x64.png')
        this.load.image('springBack1', '../../src/assets/bg_spring_Trees_1.png')
        this.load.image('springBack2', '../../src/assets/bg_spring_Trees_2.png')
        this.load.tilemapTiledJSON('FirstMap', '../../src/assets/mapFirst.json')
        this.load.atlas('bCoin', '../../src/assets/bronze_coin.png', '../../src/assets/bronze_coin_atlas.json')
        this.load.atlas('panda', '../../src/assets/panda.png', '../../src/assets/panda_atlas.json')
    }
    //===================================================================================================
    //------------------------------------CREATE-------------------------------------------------------  
    create (){
        const wit = 780/2
        this.add.image(wit+60, 310, 'springBack1')
        this.add.image(3*wit+60, 310, 'springBack2')
        this.add.image(5*wit+60, 310, 'springBack1')
        this.add.image(7*wit+60, 310, 'springBack2')

        this.createMap()
        this.createPlayer()
        this.createCoins()
        this.scene.run('ui-scene')

        this.cursors = this.input.keyboard.createCursorKeys()

        this.cameras.main.setBounds(64,60,8*wit,9*64)
        this.cameras.main.startFollow(this.player)
    }
    //===========================================================================================




    //----------------------------Map--------------------------------------------------
    createMap(){
        this.map = this.make.tilemap({ key: 'FirstMap' })
        this.tileset = this.map.addTilesetImage('base64', 'tileSet')
        this.ground = this.map.tilma
        this.ground = this.map.createLayer('Ground', this.tileset)
        this.map.setCollisionByProperty({type: 'c'}, true)
    }


    //----------------------------------Coins-----------------------------------------------
    createCoins(){
        //------------------------CoinAnimations
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
        //Creating coins group from Tiled
        this.bCoins = this.physics.add.group({
            classType: 'bCoin'
        })
        this.bCoinsLayer = this.map.getObjectLayer('Coins')
        //set the setting forEach Coin
        this.bCoinsLayer.objects.forEach(coinObj=>{
            this.bCoin = this.physics.add.sprite(coinObj.x+coinObj.width*0.5, coinObj.y, 'bCoin')
            this.bCoin.body.allowGravity = false
            this.bCoin.scale = 0.7
            this.bCoin.setCircle(20)
            this.bCoin.anims.play('coin1')
            this.bCoin.body.onOverlap = true
            this.physics.add.overlap(this.bCoin , this.player, this.setTheScore)
            })
    }


    //---------------------------------------Score----------------------------------
    setTheScore(coin, player){
        if(!this.count){this.count = 0}
        coin.disableBody(true, true)
        this.count ++
        eventsCenter.emit('update-count', this.count)
    }
    //--------------------------------------temp-lives----------------------------------
    setLives(){
        if(!this.count){this.count = 3}
        this.count --
        eventsCenter.emit('update-lives', this.count)
        if (this.count==0){this.scene.start('GameOver')}
    }

    //-----------------------------Player-----------------------------------------
    createPlayer(){
        //create the player phisics
        this.player = this.physics.add.sprite(150, 350, 'panda')
        this.player.scale = 0.3
        this.player.setFlipX(true)
        this.physics.add.collider(this.player, this.ground)
        this.player.setBounce(0.3)
        this.player.setCircle(100)
        this.player.setOffset(45, 35)
        this.player.body.onOverlap = true

        //creating the animations for the player
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
    }



//========================================================================================================
//--------------------------UPDATE-----------------------------------
    update (){
        if (this.cursors.down.isDown){
            this.player.setVelocityY(450)
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
        
        if(this.player.y>550){
            this.setLives()
            this.player.y=350
            this.player.x=150
        }

    }
}

export default GamePlayScreen
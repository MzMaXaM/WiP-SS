class GamePlayScreen extends Phaser.Scene
{
    constructor ()
    {
        super({key: 'GamePlayScreen'})
    }

    preload ()
    {
        this.load.tilemapTiledJSON('FirstMap', '../../src/assets/mapFirst.json')
        this.load.image('tilesYellow64x64', '../../src/assets/yellow64x64.png')
        this.load.image('tilesYellow64x53', '../../src/assets/yellow64x53.png')
        this.load.atlas('panda', '../../src/assets/panda.png', '../../src/assets/panda_atlas.json', )
    }
      
    create ()
    {
        var map = this.make.tilemap({ key: 'FirstMap' })
        var tileset1 = map.addTilesetImage('yellow64x64', 'tilesYellow64x64')
        var tileset2 = map.addTilesetImage('yellow64x53', 'tilesYellow64x53')
        var layer1 = map.createLayer('bigLayer', tileset1, 0, 0)
        var layer2 = map.createLayer('smalLayer', tileset2, 0, 0)

        this.add.image(150, 150, 'panda', 'idle')
    }
}

export default GamePlayScreen
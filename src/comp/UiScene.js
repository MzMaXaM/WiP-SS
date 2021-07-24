import eventsCenter from './EventCentre'

export default class UIScene extends Phaser.Scene
{
	constructor()
	{
		super('ui-scene')
	}

	create()
	{
		this.label = this.add.text(10, 10, 'Count: 0', {
			fontSize: 32
		})
    
    eventsCenter.on('update-count', this.updateCount, this)

    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      eventsCenter.off('update-count', this.updateCount, this)
    })
	}

	updateCount(count)
	{
		this.label.text = `Count: ${count}`
	}
}
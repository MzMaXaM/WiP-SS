import eventsCenter from "./EventCentre"

export default class UIScene extends Phaser.Scene
{
	constructor()
	{
		super('ui-scene')
	}

	create()
	{
		this.count = this.add.text(840, 460, 'Count: 0', {
			fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
			color: '#A52A2A',
			fontSize: 32
		})
    
    eventsCenter.on('update-count', this.updateCount, this)
    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      eventsCenter.off('update-count', this.updateCount, this)
    })
	}

	updateCount(count)
	{
		this.count.text = `Count: ${count}`
	}
}
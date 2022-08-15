class Corpse extends EngineObject {


	constructor(pos, size, tileIndex, tileSize, angle, color) {
		super(pos, size, tileIndex, tileSize, angle, color);
		// your object init code here

		this._animLifetime = 10;

		this.timeAlive = 0;
		this.fallDirection = 1;
		this.setCollision(0, 0, 1);
	}

	update() {
		// your object update code here

		this.timeAlive++;

		this.angle = this.fallDirection * Math.min(1, this.timeAlive / this._animLifetime) * Math.PI / 2;

		this.velocity.x = this.velocity.x * 0.9;
		this.velocity.y = this.velocity.y  * 0.9;


		super.update(); // update object physics and position
 
	}

	render() {
		super.render(); // draw object as a sprite
		// your object render code here
	}

	push(velocity) {
		this.velocity.x = velocity.x / 3;
		this.velocity.y = velocity.y / 3;
		this.fallDirection = velocity.x > 0 ? 1 : -1;
	}

}
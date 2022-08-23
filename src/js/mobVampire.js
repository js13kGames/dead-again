/** @format */

class Vampire extends Enemy {
	constructor(pos) {
		super(pos, vec2(0.8), g_game.tileNumbers.bat);

		this._maxSpeed = 0.5;

		this.hp = 3;
		this.mass = 2;
		this.thinkPause = 0;
		this.toPlayer = undefined;
		this.walkingSpeed = rand(0.05, 0.2);
		this._walkCycleFrames = 60;

		this.transformTimer = undefined;
		this.transforming = false;
		this.transformed = false;
		this._vampPower = 4;

		this.pos.y -= 0.5;

		this.soundGroan = this.soundScream = new Sound([
			,
			0.1,
			3665.40639,
			0.12,
			0.05,
			0.09,
			3,
			0.7,
			7.4,
			2.5,
			,
			0.19,
			,
			0.9,
			12,
			,
			0.04,
			-0.57,
			0.13,
		]);
	}

	update() {
		// think and look
		if (this.thinkPause-- <= 0) {
			this.toPlayer = g_game.player.pos.subtract(this.pos);
			this.thinkPause = rand(20, 100);
		}

		// take a step
		if (rand(0, 100) < 10) {
			let force = vec2(0);
			if (this.toPlayer) force = this.toPlayer.normalize(this.walkingSpeed);

			this.applyForce(force);
		}

		this.applyDrag(1.5);
		this.velocity = this.velocity.clampLength(this._maxSpeed);

		if (!this.transformed) {
			// flap wings
			this.angle = this.walkCyclePlace > this._walkCycleFrames / 2 ? 0 : Math.PI;

			if (this.transforming) {
				if (this.transformTimer.elapsed()) {
					// transform!
					this.angle = 0;
					this.miniFace = g_game.miniTileNumbers.miniFaceVampire;
					this._walkCycleFrames = 15;
					makeParticles(this.pos, rand(1), new Color(155 / 255, 173 / 255, 183 / 255));
					this.tileIndex = g_game.tileNumbers.vampire;
					this.hp += 5;
					this.walkingSpeed *= this._vampPower;
					this.transformed = true;
				}
			} else {
				if (isOverlapping(this.pos, this._hitbox, g_game.player.pos, g_game.player._hitbox)) {
					// scary foreboding hint at what is coming
					g_game.transforms.push({ pos: this.pos.copy(), life: 60, tileIndex: g_game.tileNumbers.faceVampire });
					this.transformTimer = new Timer(2);
					this.transforming = true;
				}
			}
		}

		super.update(); // update object physics and position
	}

	render() {
		super.render();
	}

	postRender() {
		super.postRender();
	}

	hit(velocity, pos) {
		this.walkingSpeed = rand(0.05, 0.2) * (this.transformed ? this._vampPower : 1);
		this.thinkPause += rand(10, 30);
		this.toPlayer = undefined;
		this.groan(1, this.transformed ? 1 : 0.3);
		return super.hit(velocity, pos);
	}

	collideWithObject(o) {
		if ((this.transformed && o instanceof Vampire && o.transformed) || o instanceof Zombie) {
			const TOO_CLOSE = 0.7;

			let toOther = o.pos.subtract(this.pos);
			if (toOther.length() < TOO_CLOSE) {
				let pushForce = toOther.normalize(rand(0, 0.1) / (toOther.length() + 0.001));
				o.applyForce(pushForce);
			}
		}
		if (o instanceof MobPlayer) {
			this.groan(0.01, 1);
		}

		return false;
	}
}

/** @format */

var tileLayer;
var playerSpawn;

class MapManager {
	constructor() {
		this.createMap();
	}

	createMap() {
		let theMap = mapData[g_levelDef.map];
		let w = theMap.w;
		let h = theMap.h;

		g_doors = {};

		tileLayer = new TileLayer(vec2(0, 0), vec2(w, h), TILE_SIZE, vec2(1));
		initTileCollision(vec2(w, h));

		for (let y = 0; y < h; y++) {
			for (let x = 0; x < w; x++) {
				// floor
				let tld = new TileLayerData(
					tileNumbers_floorStone,
					Math.floor(rand(0, 3)),
					false,
					new Color(1, 1, 1, rand(0.4, 0.6))
				);
				tileLayer.setData(vec2(x, h - 1 - y), tld);

				let t = theMap.data[x + y * w];
				if (t) {
					t -= 1;

					let offsetVec = vec2(x + 0.5, h - 1 - y + 0.5);

					if (t == tileNumbers_player) {
						playerSpawn = offsetVec;
						continue;
					} else if (t == tileNumbers_pistol) {
						new Pistol(offsetVec);
						continue;
					} else if (t == tileNumbers_shotgun) {
						new Shotgun(offsetVec);
						continue;
					} else if (t == tileNumbers_rifle) {
						new Rifle(offsetVec);
						continue;
					} else if (t == tileNumbers_beefyZombie) {
						g_enemies.push(new BossZombie(offsetVec));
						continue;
					} else if (t == tileNumbers_boxBullets) {
						new AmmoBox(offsetVec, tileNumbers_pistol);
						continue;
					} else if (t == tileNumbers_boxShells) {
						new AmmoBox(offsetVec, tileNumbers_shotgun);
						continue;
					} else if (t == tileNumbers_boxRifleAmmo) {
						new AmmoBox(offsetVec, tileNumbers_rifle);
						continue;
					}

					if (t == tileNumbers_door) {
						g_doors[x + "_" + (h - 1 - y)] = { hp: 3 };
					} else {
						// pushers on all collision stuff except doors
						pushers.push(new Pusher(offsetVec, 0.01, 0.5, 1, 0));
					}

					setTileCollisionData(vec2(x, h - 1 - y), t);
					let tint = new Color(rand(0.8, 1), rand(0.8, 1), rand(0.8, 1));
					if (g_level == 0 || g_level == 2) {
						// brown houses
						tint = tint.add(new Color(217 / 255, 160 / 255, 102 / 255));
					}
					let tld = new TileLayerData(t, 0, rand(0, 1) < 0.5, tint);
					tileLayer.setData(vec2(x, h - 1 - y), tld);

					// moss
					g_moss.push({
						pos: offsetVec.add(randInCircle(5 / 12)),
						tileIndex: miniTileNumbers_moss + Math.floor(rand(0, 11)),
						angle: rand(0, PI * 2),
					});
				}
			}
		}

		//tileLayer.redraw();
	}

	// STUPID FOG OF WAR / LINE OF SIGHT
	renderFOW() {
		let theMap = mapData[g_levelDef.map];

		let pos = vec2(0);
		for (let x = 0; x < theMap.w; x++) {
			for (let y = 0; y < theMap.h; y++) {
				let dVec = vec2(g_player.pos.x - x - 0.5, g_player.pos.y - y - 0.5);
				pos.x = x + 0.5 + dVec.clampLength(min(1.5, dVec.length())).x;
				pos.y = y + 0.5 + dVec.clampLength(min(1.5, dVec.length())).y;
				let pos2 = tileCollisionRaycast(g_player.pos, pos);
				if (pos2 && !(pos2.x == x + 0.5 && pos2.y == y + 0.5)) {
					let shadow = g_shadows[x + "_" + y] || {
						x: x + 0.5,
						y: y + 0.5,
						alpha: 0,
					};
					shadow.alpha = min(1, shadow.alpha + 0.1);

					g_shadows[x + "_" + y] = shadow;
					//drawRect(pos, vec2(0.1), new Color(1, 0, 0));
				} else {
					//drawRect(pos, vec2(0.1), new Color(0, 1, 0));
				}
			}
		}

		const shadowSize = vec2(1.05);
		let color = colorBlack.copy();
		for (let key in g_shadows) {
			let shadow = g_shadows[key];
			// fade
			shadow.alpha -= 0.01;
			if (shadow.alpha <= 0) {
				delete g_shadows[key];
			} else {
				pos.x = shadow.x;
				pos.y = shadow.y;
				color.a = shadow.alpha;
				drawRect(pos, shadowSize, color);
			}
		}
	}

	render() {
		tileLayer.redraw();
	}
}

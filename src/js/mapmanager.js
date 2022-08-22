/** @format */

class MapManager {
	constructor() {
		this.createMap();
	}

	createMap() {
		let myMap = mapData[g_level % mapData.length].data;
		let w = mapData[g_level % mapData.length].w;
		let h = mapData[g_level % mapData.length].h;

		g_game.doors = {};

		if (g_game.TILE_LAYER_COLLISION) {
			g_game.tileLayer = new TileLayer(vec2(0, 0), vec2(w, h), TILE_SIZE, vec2(1));
			initTileCollision(vec2(w, h));
		}

		for (let y = 0; y < h; y++) {
			for (let x = 0; x < w; x++) {
				let t = myMap[x + y * w];
				if (t) {
					if (t - 1 == g_game.tileNumbers.door) {
						g_game.doors[x + "_" + (h - 1 - y)] = { hp: 3 };
					}

					if (t - 1 == g_game.tileNumbers.vampire) {
						let vamp = new Vampire(vec2(x + 0.75, h - 1 - y + 0.75));
						g_game.enemies.push(vamp);
						continue;
					} else if (t - 1 == g_game.tileNumbers.npc) {
						new Npc(vec2(x + 0.5, h - 1 - y + 0.5), vec2(1));
						continue;
					} else if (t - 1 == g_game.tileNumbers.boxBullets) {
						new AmmoBox(vec2(x + 0.5, h - 1 - y + 0.5), vec2(1), t - 1);
						continue;
					} else if (t - 1 == g_game.tileNumbers.boxShells) {
						new AmmoBox(vec2(x + 0.5, h - 1 - y + 0.5), vec2(1), t - 1);
						continue;
					}
					setTileCollisionData(vec2(x, h - 1 - y), t - 1);
					g_game.tileLayer.setData(vec2(x, h - 1 - y), new TileLayerData(t - 1));
				} else {
					// floor
					//new EngineObject(vec2(x, h - 1 - y), vec2(1), 11, tileSize);
				}
			}
		}

		//g_game.tileLayer.redraw();
	}

	render() {
		g_game.tileLayer.redraw();
	}
}

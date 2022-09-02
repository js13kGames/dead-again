function soundPlayExtra(sound, pos, vol, pitch, rand = 0, delay = 0, repeat = 1) {
	for (let i = 0; i < repeat; i++) { 
		setTimeout( () => sound.play(pos, vol, pitch, rand), delay * (i+i) )
	}
 }




/// Player

var soundPlayerScream = new Sound([1, 0, 440, 0, 0.1, 1, 3, 1, -0.2, 0, 50, 0, 0, 0.4, 0, 0.05, 0.05, 0.9, 0.5, 0]);


var soundPickup = new Sound([1, 0.1, 200, 0, 0, 0, 4, 0, 0, 1.2, 50, 0.57, 0, 0, 0, 0.2, 0.19, 0, 0.14, 0]);

/// Weapons

var soundRifle = new Sound([3, , 164.8138, , , , 4, , , , , , , , , -0.3]);
var soundPistol = new Sound([1, , 164.8138, , , , 4, , , , , , , , , -0.3]);
var soundShotgun = new Sound([3, , 352, 0.07, 0.01, 0.2, 4, 3.04, , 0.4, , , 0.15, 1.5, , 0.7, 0.12, 0.2]);

var soundBulletHit = new Sound([1.05, 0.05, 208, 0.01, 0, 0.09, 0, 0, -9.9, 0, 0, 0, 0, 0.4, 0, 0.1, 0.02, 0.75, 0.05, 0.04, ]);

var soundGunReload = new Sound([, 0.3, 0, 0.01, , 0.01, 4, 0, 20, 6.6, 600, 0.07, 0.32, 3.6, 12, , , , , 0.12]);
var soundGunEmpty = new Sound([1, 0, 65, 0, 0, 0.02, 4, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0]);



/// Monsters

var soundEnemyGroan = new Sound([ 1, 0.5, 329.6276, 0.16, 0.62, 0.33, 0, 0.5, 0, 0, -50, 0.14, 0.13, 2.5, 28, 0, 0, 0.9, 0.07, 0.12,]);
var soundBossStep = new Sound([3.5, , 15, 0.02, 0.1, 0.05, , 3.67, , 0.6, , , 0.13, 1.8, , 0.3, , 0.35, 0.01]);
var soundBossThrow = new Sound([, , 1650, 0.01, 0.09, 0.02, 4, 0.5, 1, , , 0.06, , , 13, , , 0.9, 0.1]);
var soundBossTearing = new Sound([1.08, , 50, , 0.18, 0.45, 4, 0, , , , , 0.01, 0.3, , 1.2, , 0.3, 0.11]);
var soundVampireGroan = new Sound([,0.1,3665.40639,0.12,0.05,0.09,3,0.7,7.4,2.5,,0.19,,0.9,12,,0.04,-0.57,0.13,]);



var soundBoulderDestroy = new Sound([1.08, , 50, , 0.18, 0.45, 4, 0, , , , , 0.01, 0.3, , 1.7, , 0.3, 0.11]);
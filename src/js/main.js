
function init() {
	console.log('LOADIN!');
	// startup LittleJS with your game functions after the tile image is loaded
	engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, 'assets/gfx/tiles.png');

	const pos = vec2(2, 3);
	const size = vec2(12, 12);

	const player = new Player(pos, vec2(3, 3), 0, vec2(12, 12));
}

function gameInit()
{
    // called once after the engine starts up
    // setup the game
}

function gameUpdate()
{
    // called every frame at 60 frames per second
    // handle input and update the game state
}

function gameUpdatePost()
{
    // called after physics and objects are updated
    // setup camera and prepare for render
}

function gameRender()
{
    // called before objects are rendered
    // draw any background effects that appear behind objects
}

function gameRenderPost()
{
    // called after objects are rendered
    // draw effects or hud that appear above all objects
}

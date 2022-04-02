

import ResizeHandler from './scenes/ResizeHandler.js'
import PreloadScene from './scenes/PreloadScene.js'
import StartScene from './scenes/StartScene.js'
import GameScene from './scenes/GameScene.js'
import GameOverScene from './scenes/GameOverScene.js'


// Aspect Ratio 16:9 - landscape

// 720p
const MAX_SIZE_WIDTH_SCREEN = 1280
const MAX_SIZE_HEIGHT_SCREEN = 720

// 240p
const MIN_SIZE_WIDTH_SCREEN = 426
const MIN_SIZE_HEIGHT_SCREEN = 240

// qHD
const SIZE_WIDTH_SCREEN = 960
const SIZE_HEIGHT_SCREEN = 540

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE,
		autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'gamediv',
        width: SIZE_WIDTH_SCREEN,
        height: SIZE_HEIGHT_SCREEN,
        min: {
            width: MIN_SIZE_WIDTH_SCREEN,
            height: MIN_SIZE_HEIGHT_SCREEN
        },
        max: {
            width: MAX_SIZE_WIDTH_SCREEN,
            height: MAX_SIZE_HEIGHT_SCREEN
        }
    },
	physics: {
        default: 'arcade',
        arcade: {
             debug: false,
            gravity: { y: 300 }
        }
    },
    dom: {
        createContainer: true
    },
	//If several are given, the first is started
    scene: [ResizeHandler, PreloadScene, StartScene, GameScene, GameOverScene]

};



// the game instance
const game = new Phaser.Game(config);



// Global
game.debugMode = false;
game.embedded = false; // game is embedded into a html iframe/object

game.screenBaseSize = {
    maxWidth: MAX_SIZE_WIDTH_SCREEN,
    maxHeight: MAX_SIZE_HEIGHT_SCREEN,
    minWidth: MIN_SIZE_WIDTH_SCREEN,
    minHeight: MIN_SIZE_HEIGHT_SCREEN,
    width: SIZE_WIDTH_SCREEN,
    height: SIZE_HEIGHT_SCREEN
};

game.orientation = "landscape";

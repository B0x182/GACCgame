<div align="center">
  
  <img src="assets/images/skull.png" alt="skull" width="80" height="80">
  
  <h3 align="center">GACC Community Game</h3>
  
  <p align="center">
    <a href="https://b0x182.github.io/GACCgame/"><strong>Play GACC Game »</strong></a>
  </p>
  
</div>


## About 

This is a simple browser game written in JavaScript, using Phaser where you need catching items.
The game can be played on desktop and mobile devices. 

* game starts with 3 lives and ends with 0 lives
* any collectibles may remain on the ground for later pick up
* any collectibles may disappear in the clouds
* don’t get hit by stones, skulls or red serums
* there are maximum 2 skulls in the game, which appear and disappear by time
* skulls will remove collectibles on collision
* there are 2 game modes


## Game Objects

Collectibles: 
* Banana 1:&emsp;	        +1 score
* Banana 2:&emsp;  	      +2 score
* Banana 3:&emsp; 	      + 3 score
* Serum 1:&nbsp;&emsp;		+ 5 score
* Serum 2:&nbsp;&emsp; 		+10 score

Incollectible:
* Stone:&emsp;&nbsp;&nbsp;&emsp;&emsp;	-1 live
* Red Serum 1:&emsp;            -1 live
* Skull:&emsp;&nbsp;&nbsp;&emsp;&emsp; -1 live

## Game Modes

There are two game modes which have different player styles; “normal” and “hard” which can be selected on the start screen. On “hard” mode the item drop time is much faster than on the “normal” mode.


## Resolution

The game was primary designed for desktop environment on and has a base-resolution of 960 x 540. Some resources are on higher resolution. The game has a resize-handler so the game can be scaled from base-resolution to a min-resolution and max-resolution. 

const MAX_SIZE_WIDTH_SCREEN = 1280<br>
const MAX_SIZE_HEIGHT_SCREEN = 720<br>
<br>
const MIN_SIZE_WIDTH_SCREEN = 426<br>
const MIN_SIZE_HEIGHT_SCREEN = 240<br>


## Desktop

On desktop environments the game can be played with the cursor keys; up, left and right


## Mobile 

The a resize-handler allows the usage on mobile devices. The viewport on mobile is normal small e.g.: iPhone 12 mini has a viewport size of 360 x 780. The game is scaled down from base-resolution to the size of the mobile device. Since the resources are on higher resolution it may look a little fuzzy. 
To avoid this the base-resolution has to be low for mobile devices, but then it would be full of pixels on desktops. 
 
* Use it in landscape mode
* Use one hand for left/right (swipe) and the other hand for jump (upwards swipe)


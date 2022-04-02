class GameOverScene extends Phaser.Scene {

	constructor() {
		super('GameOverScene');
	}

	
	handlerScene = null;
    sceneStopped = false;
	scoreData;

	preload() {
		
		this.sceneStopped = false;
        this.width = this.game.screenBaseSize.width;
        this.height = this.game.screenBaseSize.height;
        this.handlerScene = this.scene.get('ResizeHandler');
        this.handlerScene.sceneRunning = 'GameOverScene';
		
		  const { width, height } = this;    
       this.handlerScene.updateResize(this);
		
	}

	create(data) {
		
		 const { width, height } = this;    
       this.handlerScene.updateResize(this);
		
		
		if (typeof data.score !== "number"){
			this.scoreData = 0;
		}		
		else{
			this.scoreData = data.score;
		}
		
		
		 // background image
   		 this.add.image(0, 0, "greens1").setOrigin(0).setScale(.75);
		
	   let gameOver = this.add
      .text(this.width  / 2, 50, "GAME OVER", {
        fontFamily: "monospace",
        fontSize: "80px",
        fill: "white",
      })
      .setOrigin(0.5);
    gameOver.setShadow(2, 2, "DarkSlateGray", 5);

    let scoreText = this.add
      .text(this.width  / 2, 150, `Score: ${this.scoreData}`, {
        fontFamily: "monospace",
        fontSize: "45px",
        fill: "white",
      })
      .setOrigin(0.5);
    scoreText.setShadow(2, 2, "DarkSlateGray", 2);


		
		this.l1 = this.add.image(this.width  / 4 , this.height / 3, "level1")
			.setOrigin(.5)
			.setScale(.5)
			.setDepth(1)
		;
		if(data.level === 1){
			this.l1.visible = true;
		}
		else{
			this.l1.visible = false;
		}
		
		this.l2 = this.add.image(this.width  / 4 , this.height / 3, "level2")
			.setOrigin(.5)
			.setScale(.5)
			.setDepth(1)
		;
		if(data.level === 2){
			this.l2.visible = true;
		}
		else{
			this.l2.visible = false;
		}
        



		this.playBtn = this.add.image(this.width  / 2, this.height  / 2, "play")
			.setOrigin(.5)
			.setDepth(1)
			.setInteractive({ cursor: "pointer" })
			.on('pointerdown',  () => this.playAgain())
		;
        this.playBtn.visible = true;

	var pText = this.make.text({
                x: this.width  / 2,
                y: this.height  / 2 + 50 ,
                text: 'Play again',
                style: {
                    font: '20px monospace',
                    fill: 'white'
                }
            });
            pText.setOrigin(.5);
			pText.setShadow(2, 2, "DarkSlateGray", 2);
		


	}

	update() {

	}
	
	
	playAgain()
	{
		this.sceneStopped = true;
        this.scene.stop('GameOverScene');
        this.handlerScene.launchScene('StartScene');
	}



}

export default GameOverScene;
class StartScene extends Phaser.Scene {

	constructor() {
		super('StartScene');
	}


	handlerScene = null;
    sceneStopped = false;
	

	preload() {
		
		this.sceneStopped = false
        this.width = this.game.screenBaseSize.width;
        this.height = this.game.screenBaseSize.height;
        this.handlerScene = this.scene.get('ResizeHandler');
        this.handlerScene.sceneRunning = 'StartScene';
		
	}

	create() {
	   
	   const { width, height } = this;    
       this.handlerScene.updateResize(this);
	   
	   // background image
   		 this.add.image(0, 0, 'greens1').setOrigin(0).setScale(.75);
	   
	   
	    var text = this.make.text({
                x: this.width  / 2 ,
                y: 50  ,
                text: 'Select Game Mode',
                style: {
                    font: '20px monospace',
                    fill: 'white'
                }
            });
            text.setOrigin(.5);
			text.setShadow(2, 2, "DarkSlateGray", 2);
			
	   
	    var l1Text = this.make.text({
                x: this.width  / 3 ,
                y: this.height / 2 + 25 ,
                text: 'Normal',
                style: {
                    font: '20px monospace',
                    fill: 'white'
                }
            });
            l1Text.setOrigin(.5);
			l1Text.setShadow(2, 2, "DarkSlateGray", 2);
		
		
		this.l1Btn = this.add.image(this.width  / 3 , this.height / 3, "level1")
			.setOrigin(.5)
			.setScale(.5)
			.setDepth(1)
			.setInteractive({ cursor: "pointer" })
			.on('pointerdown',  () => this.startLevel1())
		;
        this.l1Btn.visible = true;
		
		
		   var l2Text = this.make.text({
                x: this.width  / 3 * 2,
                y: this.height / 2 + 25 ,
                text: 'Hard',
                style: {
                    font: '20px monospace',
                    fill: 'white'
                }
            });
            l2Text.setOrigin(.5);
			l2Text.setShadow(2, 2, "DarkSlateGray", 2);
		
		
		this.l2Btn = this.add.image(this.width  / 3 * 2 , this.height / 3, "level2")
			.setOrigin(.5)
			.setScale(.5)
			.setDepth(1)
			.setInteractive({ cursor: "pointer" })
			.on('pointerdown',  () => this.startLevel2())
		;
        this.l2Btn.visible = true;
		

	}

	update() {

	}


	startLevel1()
	{
		this.sceneStopped = true;
        this.scene.stop('StartScene');
        this.handlerScene.launchScene('GameScene', 1);
		
	}
	
	startLevel2()
	{
		this.sceneStopped = true;
        this.scene.stop('StartScene');
        this.handlerScene.launchScene('GameScene', 2);
	}

}

export default StartScene;

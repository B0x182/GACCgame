class PreloadScene extends Phaser.Scene {

	constructor() {
		super('PreloadScene');
	}

	// variables 
    handlerScene = null;
    sceneStopped = false;
	

	preload() 
	{
				
		this.width = this.game.screenBaseSize.width;
        this.height = this.game.screenBaseSize.height;

        this.handlerScene = this.scene.get('ResizeHandler');
        this.handlerScene.sceneRunning = 'PreloadScene';
        this.sceneStopped = false;
		
       
			
		var loadingText = this.make.text({
                x: this.width  / 2,
                y: this.height / 2 + 200,
                text: 'Loading...',
                style: {
                    font: '20px monospace',
                    fill: 'black'
                }
            });
            loadingText.setOrigin(.5);
         
            this.load.on('complete', () => {
              
                //loadingText.destroy();
              
				this.time.addEvent({
                delay: 3000,
                callback: () => {
        
                    this.sceneStopped = true
					// Shutdown the Scene, clearing display list, timers, etc.
                    this.scene.stop('PreloadScene')
                    this.handlerScene.cameras.main.setBackgroundColor("#020079")
                    this.handlerScene.launchScene('StartScene')
                },
                loop: false
            });
            });
			
		// -------------- load files ------------------------------
		
		this.load.image('guide', 'assets/images/960x540-guide.png')
		
		this.load.image('logo', 'assets/images/logo.png')
		
		this.load.image('play', 'assets/images/play.png');
		
		this.load.image('banana_1', 'assets/images/banana_1.png');
		this.load.image('banana_2', 'assets/images/banana_2.png');
		this.load.image('banana_3', 'assets/images/banana_3.png');
		this.load.image('serum_1', 'assets/images/serum_1.png');
		this.load.image('serum_2', 'assets/images/serum_2.png');
		
		this.load.image('stone', 'assets/images/stone.png');
		this.load.image('serum_1_red', 'assets/images/serum_1_red.png');
		this.load.image('skull', 'assets/images/skull.png');
		
		this.load.image('greens', 'assets/images/greens.png');
		this.load.image('ground', 'assets/images/ground.png');
		
		this.load.image('cloud', 'assets/images/cloud.png');
		
		this.load.spritesheet('ape', 'assets/images/ape.png', { frameWidth: 670, frameHeight: 1500 });
		
		// -------------------------------------------------------
			
	}

	create() 
	{
		const { width, height } = this;
        this.handlerScene.updateResize(this);
	    this.add.image(width / 2, height / 2, 'logo').setOrigin(.5).setScale(0.4);
	  
	}

	update()
	{

	}
	

}

export default PreloadScene;
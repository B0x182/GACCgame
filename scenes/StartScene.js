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
	   
	   
	   var text = this.add.text(100,100, 'StartScene');

		

	}

	update() {

	}



}

export default StartScene;
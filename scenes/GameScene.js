class GameScene extends Phaser.Scene {

	constructor() {
		super('GameScene');
	}

	// variables
	handlerScene = null;
    sceneStopped = false;
	
	score;
	lives;
	dropDelay;
	
	scoreText;
	livesText;
	
	player;
	cursors;
	platforms; 
	movingPlatform; 
	
	collectibles;
	collectiblesOnGround;
	incollectibles;
	skull1;
	skull2;
	skullCycle;


	preload() {
		
		this.sceneStopped = false
        this.width = this.game.screenBaseSize.width;
        this.height = this.game.screenBaseSize.height;
        this.handlerScene = this.scene.get('ResizeHandler');
        this.handlerScene.sceneRunning = 'GameScene';
		
	}

	create(level) {
	   
	   const { width, height } = this;    
       this.handlerScene.updateResize(this);
	   
	      // Map difficulty to dropDelay 
		let difficultyToDelay = { 1: 700, 2: 350 };
		this.dropDelay = difficultyToDelay[level];
		this.ape = 'ape' + level.toString();
		this.level = level;
	   
	   this.skullCycle = 0;
	   this.score = 0;
	   this.lives = 3;
	     
	   
	    // background image
   		 this.add.image(0, 0, "greens2").setOrigin(0).setScale(.75);
	  
		
		// create score text
		this.scoreText = this.add.text(20, 15, "", {
		fontFamily: "monospace",
		fontSize: "18px",
		fill: "white",
		});
		this.scoreText.setShadow(2, 2, "DarkSlateGray", 2);
		this.setScoreText();
	  
	  
		// create lives text
		this.livesText = this.add.text(20, 35, "", {
		fontFamily: "monospace",
		fontSize: "18px",
		fill: "white",
		});
		this.livesText.setShadow(2, 2, "DarkSlateGray", 2);
		this.setLivesText();
		
 
		// create groups
	    this.platforms = this.physics.add.staticGroup();
		// collectibles
		this.collectibles = this.physics.add.group();
		this.collectiblesOnGround = this.physics.add.group();
		// incollectibles
		this.incollectibles = this.physics.add.group();
		this.skulls = this.physics.add.group();

		this.skull1 = this.skulls.create(0, 20, 'skull').setScale(0.1);
        this.skull1.setBounce(1);
        this.skull1.setCollideWorldBounds(true);
        this.skull1.allowGravity = false;
		this.skull1.disableBody(true, true);
		
		this.skull2 = this.skulls.create(0, 20, 'skull').setScale(0.1);
        this.skull2.setBounce(1);
        this.skull2.setCollideWorldBounds(true);
        this.skull2.allowGravity = false;
		this.skull2.disableBody(true, true);


		this.movingPlatform = this.physics.add.image(50, 150, 'cloud');
		this.movingPlatform.setImmovable(true);
    	this.movingPlatform.body.allowGravity = false;
    	this.movingPlatform.setVelocityX(50);

	    // here we create the ground
	     this.platforms.create(0, 540-10, 'ground').setOrigin(0).refreshBody();

	    // The player and its settings
    	this.player = this.physics.add.sprite(100, 200, this.ape).setScale(0.13);
		
		 // Player physics properties. Give the little guy a slight bounce.
    	this.player.setBounce(0.2);
    	this.player.setCollideWorldBounds(true);
    	this.createAnimations();
		
		  //  Input Events
        this.cursors = this.input.keyboard.createCursorKeys();

        //physics 
   		 this.physics.add.collider(this.player, this.platforms);
		 this.physics.add.overlap(this.player, this.collectibles, this.collectItem, null, this);
   		 this.physics.add.overlap(this.player, this.collectiblesOnGround, this.collectItem, null, this);
   		 this.physics.add.overlap(this.player, this.incollectibles, this.hitIncollectible, null, this);
   		 this.physics.add.overlap(this.player, this.skulls, this.hitSkull, null, this);
		 
		 
   		 this.physics.add.collider(this.skulls, this.skulls);
		 this.physics.add.collider(this.skulls, this.movingPlatform);
		 this.physics.add.collider(this.skulls, this.platforms);
		 this.physics.add.overlap(this.skulls, this.collectibles, this.removeItem, null, this);
		
		this.physics.add.overlap(this.collectibles, this.movingPlatform, this.removeItem, null, this);
		 
		  this.physics.add.collider(this.collectiblesOnGround, this.platforms); 
		 
		 // continually make objects fall using timer
		this.time.addEvent({
			delay:this.dropDelay,
			callback: this.itemDrop, 
			callbackScope: this,
			loop: true,
		});
		 
		 
		this.time.addEvent({
			delay: 6 * this.dropDelay + 300,
			callback: this.itemDropOnGround, 
			callbackScope: this,
			loop: true,
		});
		
		this.time.addEvent({
			delay: 10 * this.dropDelay + 300,
			callback: this.itemDropM1, 
			callbackScope: this,
			loop: true,
		});
		
		this.time.addEvent({
			delay: 20 * this.dropDelay + 300,
			callback: this.itemDropM2, 
			callbackScope: this,
			loop: true,
		});
		
		this.time.addEvent({
			delay: 20000,
			callback: this.skullDrop, 
			callbackScope: this,
			loop: true,
		});
		

		  if (this.game.debugMode)
		  {
			  this.add.image(0, 0, 'guide').setOrigin(0).setDepth(1);
		  }
 
	}

	update(time, delta) 
	{

		// move left
		if (this.cursors.left.isDown)
    	{
			this.player.setVelocityX(-180);
        	this.player.anims.play('left', true);
    	}
    	// move right
    	else if (this.cursors.right.isDown)
    	{
			this.player.setVelocityX(180);
        	this.player.anims.play('right', true);
    	}
		// Neutral (no movement)
		else
		{
			this.player.setVelocityX(0);
			this.player.anims.play('turn');
		}
		// jump
		if (this.cursors.up.isDown && this.player.body.touching.down)
		{
			this.player.setVelocityY(-220);
		}
		
		 if (this.movingPlatform.x >= 450)
		{
			this.movingPlatform.setVelocityX(-25);
		}
		else if (this.movingPlatform.x <= 200)
		{
			this.movingPlatform.setVelocityX(25);
		}
		
		
		// only skull 2 has Velocity and rotates
		this.skull2.angle += 1;
		
		if(this.lives <= 0){
			this.sceneStopped = true;
			this.scene.stop('GameScene');
			// need to remove anims if other sprite is selected on restart
			this.anims.remove('left');
			this.anims.remove('right');
			this.anims.remove('turn');
			this.handlerScene.launchScene('GameOverScene', { score: this.score, level: this.level});
			
		}

	}

	
	itemDrop()
	{
		let xAxis = Math.floor(Math.random() * this.game.screenBaseSize.width) + 20;
    	let edibleOrInedible = Math.floor(Math.random() * 4);
    	
		// create and drop inedible 1/4 of the time
    	if (edibleOrInedible === 2) 
    	{
      		this.createInCollectibles(xAxis, 20);
      		// create and drop an edible  3/4 of the time
    	} 
    	else 
    	{
			this.createCollectibles(xAxis, 20);
    	}
	}
	
	
	itemDropM1()
	{
		let xAxis = Math.floor(Math.random() * this.game.screenBaseSize.width) + 20;
		this.collectibles.create(xAxis, 20, 'serum_1').setScale(0.1);
	}
	
	itemDropM2()
	{
		let xAxis = Math.floor(Math.random() * this.game.screenBaseSize.width) + 20;
		this.collectibles.create(xAxis, 20, 'serum_2').setScale(0.1);
	}
	
	skullDrop()
	{
		this.skullCycle++;
		
		if(this.skullCycle === 1){
			
			
			let xAxis = Math.floor(Math.random() * this.game.screenBaseSize.width) + 20;
			 this.skull1.enableBody(true, xAxis, 25, true, true);
		}
		if(this.skullCycle === 2){
			
			
			let xAxis = Math.floor(Math.random() * this.game.screenBaseSize.width) + 20;
			this.skull2.enableBody(true, xAxis, 0, true, true);
			this.skull2.setVelocity(Phaser.Math.Between(-200, 200), 20);
		}
		if(this.skullCycle === 3){
			
			this.skull1.disableBody(true, true);
			this.skull2.disableBody(true, true);
			this.skullCycle = 0;
		}
		
		
	}
	
	itemDropOnGround()
	{
		let xAxis = Math.floor(Math.random() * this.game.screenBaseSize.width) + 20;
		this.createCollectiblesOnGround(xAxis, 20);
		
	}
	
	createCollectibles(x, y) 
	{
		// Make object dropped random
		let o = ["banana_1", "banana_2", "banana_3"];
		let randomIdx = Math.floor(Math.random() * 3);
		// Select random edible object
		this.collectibles.create(x, y, o[randomIdx]).setScale(0.1);
	}
	
	createInCollectibles(x, y) {
   
		// Make object dropped random
		let o = ["stone", "serum_1_red"];
		let randomIdx = Math.floor(Math.random() * 2);
		// Select random edible object
		this.incollectibles.create(x, y, o[randomIdx]).setScale(0.1);
	}
	
	createCollectiblesOnGround(x, y) 
	{
		// Make object dropped random
		let o = ["banana_1", "banana_2", "banana_3"];
		let randomIdx = Math.floor(Math.random() * 3);
		// Select random edible object
		this.collectiblesOnGround.create(x, y, o[randomIdx]).setScale(0.1);
	}

	collectItem (player, item)
	{
		player.clearTint();
    	item.disableBody(true, true);
		
		if(item.texture.key == "banana_1"){
    		 this.score += 1;
			
    	}
     	if(item.texture.key == "banana_2"){
    		 this.score += 2;
			
    	}
    	if(item.texture.key == "banana_3"){
    		 this.score += 3;
			
    	}
    	if(item.texture.key == "serum_1"){
    		 this.score += 5;
		
    	}
    	if(item.texture.key == "serum_2"){
    		 this.score += 10;
			
    		 
    	}
     	this.setScoreText();
		
	}
	
	
	hitIncollectible(player, inedible) 
	{
		//this.hitSound.play();
		player.setTint(0xce6161);
		inedible.disableBody(true, true);
		
		this.lives -= 1;
  		this.setLivesText();
	}
	
	hitSkull(player, skull)
  	{
  		player.setTint(0xce6161);
  		skull.disableBody(true, true);
		
		this.lives -= 1;
  		this.setLivesText();
  		
  	}

  	removeItem (object, item)
	{
		item.disableBody(true, true);
	}

	setScoreText()
	{
  	  this.scoreText.setText('Score: ' + this.score);
	}

	setLivesText()
	{
		this.livesText.setText('Lives: ' + this.lives);
	}
	
	createAnimations()
	{

		this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers(this.ape, { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
    	});

    this.anims.create({
        key: 'turn',
        frames: [ { key: this.ape, frame: 2 } ],
        frameRate: 20
    	});

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers(this.ape, { start: 3, end: 4 }),
        frameRate: 10,
        repeat: -1
    	});
	}

}

export default GameScene;
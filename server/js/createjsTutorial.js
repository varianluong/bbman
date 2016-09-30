// Create a function called init() and append it to either the head or body. This is where we will use EaselJS.

function init(){

	// Define a stage by creating a new Stage instance, passing in our canvas element's ID.
	// This stage will hold all of our display objects and act as the visual container to our project.

	var stage = new createjs.Stage("tutorialCanvas"); // have to target the canvas
	// var circle = new createjs.Shape();

	// circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
	// circle.x = 100;
	// circle.y = 100;
	// stage.addChild(circle);

	// createjs.Tween.get(circle, {loop: true})
	// 	.to({x: 400}, 1000, createjs.Ease.getPowInOut(4))
	// 	.to({alpha: 0, y: 75}, 500, createjs.Ease.getPowInOut(2))
	// 	.to({alpha: 0, y: 125}, 100)
	// 	.to({alpha: 1, y: 100}, 500, createjs.Ease.getPowInOut(2))
	// 	.to({x: 100}, 800, createjs.Ease.getPowInOut(2));
 //    createjs.Ticker.setFPS(60);
 //    createjs.Ticker.addEventListener("tick", stage);

    var data = {
        images: ["./resources/SBM4.gif"],
        frames: [
        	// x, y, width, height, imageIndex*, regX* regY*
        	[13, 0, 16, 25], // idleUp 0
        	[31, 0, 16, 25], // walkUp 1
        	[48, 0, 16, 25], // walkUp 2
        	[69, 0, 16, 25], // idleRight 3
        	[86, 0, 16, 25], // walkRight 4
        	[104, 0, 16, 25], // walkRight 5
        	[124, 0, 16, 25], // idleDown 6
        	[141, 0, 16, 25], // walkDown 7
        	[158, 0, 16, 25], // walkDown 8
        	[180, 0, 16, 25], // idleLeft 9
        	[198, 0, 16, 25], // walkLeft 10
        	[216, 0, 16, 25], // walkLeft 11        	
        ],
        animations: {
        	idleUp:[0],
            walkUp:[1,2, true, 0.08],
            idleRight:[3],
            walkRight:[4,5, true, 0.08],
            idleDown:[6],
            walkDown:[7,8, true, 0.08],            
            idleLeft:[9],
            walkLeft:[10,11, true, 0.08],
        }
    };

    // var data = {
    //     images: ["./resources/SBM4.gif"],
    //     frames: {width:15, height:25},
    //     animations: {
    //         stand:0,
    //         run:[1,5],
    //         jump:[6,8,"run"]
    //     }
    // };
    var spriteSheet = new createjs.SpriteSheet(data);
    var bMU = new createjs.Sprite(spriteSheet, "walkUp");
    var bMR = new createjs.Sprite(spriteSheet, "walkRight");
    var bMD = new createjs.Sprite(spriteSheet, "walkDown");
    var bML = new createjs.Sprite(spriteSheet, "walkLeft");
    var bM = new createjs.Sprite(spriteSheet);

    bMU.x = stage.canvas.width / 2;
    bMU.y = 50;
    bMR.x = stage.canvas.width / 2;
    bMR.y = 100;
    bMD.x = stage.canvas.width / 2;
    bMD.y = 150;
	bML.x = stage.canvas.width / 2;
    bML.y = 200;

	bM.x = stage.canvas.width / 2;
    bM.y = 250;

    // add bM to the stage, and add it as a listener to Ticker to get updates from each frame.
    stage.addChild(bMU, bM);
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", stage);


    // var walkD = function(){
    // 	bM.gotoAndPlay('walkDown');
    // 	bM.gotoAndStop
    // }
    // var walkL = function(){
    // 	bM.gotoAndPlay('walkLeft');
    // }
    // var walkU = function(){
    // 	bM.gotoAndPlay('walkUp');
    // }
    // var walkR = function(){
    // 	bM.gotoAndPlay('walkRight');
    // }
    
	document.addEventListener('keydown', handleKeyDown);

	document.addEventListener('keyup', handleKeyUp);

	function handleKeyDown(key){
		// console.log(key);
		switch(key.keyCode) {
			case 37: // left
				bM.x -= 4;
				bM.gotoAndPlay('walkLeft');
				stage.update();
				break;
			case 38: // up
				console.log("move up");
				bM.y -= 4;
				bM.gotoAndPlay('walkUp');
				stage.update();
				break;
			case 39: // right
				bM.gotoAndPlay('walkRight');
				bM.x += 4;
				stage.update();
				break;
			case 40: // down
				bM.gotoAndPlay('walkDown');
				bM.y += 4;
				stage.update();
				break;	
		}
	}
	function handleKeyUp(key){
		console.log(key);
		switch(key.keyCode) {
			case 37: // left
				bM.gotoAndPlay('idleLeft');
				stage.update();
				break;
			case 38: // up
				bM.gotoAndPlay('idleUp');
				stage.update();
				break;
			case 39: // right
				bM.gotoAndPlay('idleRight');
				stage.update();
				break;
			case 40: // down
				bM.gotoAndPlay('idleDown');
				stage.update();
				break;	
		}
	}	

}
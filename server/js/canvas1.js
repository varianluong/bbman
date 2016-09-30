// ########## Setup ##########
var canvas = document.getElementById('tutorialCanvas');
var context = canvas.getContext('2d');


// ########## drawing methods ##########
var renderText = function(){
		context.font ='10pt Calibri';
		context.fillStyle = 'blue';
		context.fillText("Hello World!", 100, 100);			
}
// renderText();

var renderLine = function(startX, startY, endX, endY){
	context.beginPath();
	context.moveTo(startX, startY);
	context.lineTo(endX, endY);
	context.stroke();
}

var drawThickLine = function(){
	context.beginPath();
	context.moveTo(10, 150);
	context.lineTo(450, 150);
	context.lineWidth = 15;
	context.stroke();
}
// drawThickLine();

var drawArc = function(centerX, centerY, radius, startAngle, endAngle, counterCW){
	// var startAngle = 0.1 * Math.PI;
	// var endAngle = 1.9 * Math.PI;

	context.beginPath();
	context.arc(centerX, centerY, radius, startAngle, endAngle, counterCW);
	context.stroke();
}

var drawPacMan = function(pacCenterX, pacCenterY){
	renderLine(pacCenterX, pacCenterY, pacCenterX+95, pacCenterY+30);
	renderLine(pacCenterX, pacCenterY, pacCenterX+95, pacCenterY-30);
	drawArc(pacCenterX, pacCenterY, 100, 0.1 * Math.PI, 1.9 * Math.PI, false);
}

// drawPacMan(100, 100);

var drawBackground = function(imgPath, startX, startY, width, height){
	var imageObj = new Image();

	imageObj.onload = function() {
		context.drawImage(imageObj, startX, startY, width, height);
	};
	imageObj.src = imgPath;
}
drawBackground("./resources/background1.jpg", 50, 50, 700, 600);

// ########## bomberman picture methods ##########
var bm1SizeScale = 2;

// ########## up ##########
var loadBombermanUpN = function(destX, destY, size){
	var imageObj = new Image();
	var sourceX = 15;
	var sourceY = 0;
	var sourceWidth = 15;
	var sourceHeight = 25;
	var destWidth = sourceWidth*size;
	var destHeight = sourceHeight*size;

	imageObj.onload = function() {
        // context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
        context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
	};
	imageObj.src = "./resources/SBM4.gif";
}

var loadBombermanUpL = function(destX, destY, size){
	var imageObj = new Image();
	var sourceX = 33;
	var sourceY = 0;
	var sourceWidth = 15;
	var sourceHeight = 25;
	var destWidth = sourceWidth*size;
	var destHeight = sourceHeight*size;

	imageObj.onload = function() {
        // context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
        context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
	};
	imageObj.src = "./resources/SBM4.gif";
}

var loadBombermanUpR = function(destX, destY, size){
	var imageObj = new Image();
	var sourceX = 50;
	var sourceY = 0;
	var sourceWidth = 15;
	var sourceHeight = 25;
	var destWidth = sourceWidth*size;
	var destHeight = sourceHeight*size;

	imageObj.onload = function() {
        // context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
        context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
	};
	imageObj.src = "./resources/SBM4.gif";
}


loadBombermanUpN(75, 100, bm1SizeScale);
loadBombermanUpL(75, 150, bm1SizeScale);
loadBombermanUpR(75, 200, bm1SizeScale);

// ########## right ##########
var playerOneData = {
    images: ["../static/images/15bomberman.png"],
    frames: [
        // x, y, width, height, imageIndex*, regX* regY*
        [3, 37, 25, 25], // walkDown 0
        [28, 37, 25, 25], // idleDown 1
        [53, 37, 25, 25], // walkDown 2
        
        [78, 37, 25, 25], // walkLeft 3
        [103, 37, 25, 25], // idleLeft 4
        [128, 37, 25, 25], // walkLeft 5
        
        [153, 37, 25, 25], // walkRight 6
        [178, 37, 25, 25], // idleRight 7
        [203, 37, 25, 25], // walkRight 8
        
        [229, 37, 25, 25], // walkUp 9
        [254, 37, 25, 25], // idleUp 10
        [279, 37, 25, 25] // walkUp 11         
    ],
    animations: {
        idleDown:[1, 1, "idleDown"],
        walkDown:[0, 2, "walkDown", 0.08],
        idleLeft:[4, 4, "idleLeft"],
        walkLeft:[3, 5, "walkLeft", 0.08],
        idleRight:[7, 7, "idleRight"],
        walkRight:[6, 8, "walkRight", 0.08],            
        idleUp:[10, 10, "idleUp"],
        walkUp:[9,11, "walkUp", 0.08]
    }
};
var playerOneSheet = new createjs.SpriteSheet(playerOneData);
var bmWhite = new createjs.Sprite(playerOneSheet);

//
var playerTwoData = {
    images: ["../static/images/15bomberman.png"],
    frames: [
        // x, y, width, height, imageIndex*, regX* regY*
        [2, 66, 25, 25], // walkDown 0
        [27, 66, 25, 25], // idleDown 1
        [52, 66, 25, 25], // walkDown 2
        
        [77, 66, 25, 25], // walkLeft 3
        [102, 66, 25, 25], // idleLeft 4
        [127, 66, 25, 25], // walkLeft 5
        
        [152, 66, 25, 25], // walkRight 6
        [177, 66, 25, 25], // idleRight 7
        [202, 66, 25, 25], // walkRight 8
        
        [228, 66, 25, 25], // walkUp 9
        [253, 66, 25, 25], // idleUp 10
        [278, 66, 25, 25] // walkUp 11         
    ],
    animations: {
        idleDown:[1, 1, "idleDown"],
        walkDown:[0, 2, "walkDown", 0.08],
        idleLeft:[4, 4, "idleLeft"],
        walkLeft:[3, 5, "walkLeft", 0.08],
        idleRight:[7, 7, "idleRight"],
        walkRight:[6, 8, "walkRight", 0.08],            
        idleUp:[10, 10, "idleUp"],
        walkUp:[9,11, "walkUp", 0.08]
    }
};
var playerTwoSheet = new createjs.SpriteSheet(playerTwoData);
var bmBlack = new createjs.Sprite(playerTwoSheet);

//
var playerThreeData = {
    images: ["../static/images/15bomberman.png"],
    frames: [
        // x, y, width, height, imageIndex*, regX* regY*
        [3, 91, 25, 25], // walkDown 0
        [28, 91, 25, 25], // idleDown 1
        [53, 91, 25, 25], // walkDown 2
        
        [78, 91, 25, 25], // walkLeft 3
        [103, 91, 25, 25], // idleLeft 4
        [128, 91, 25, 25], // walkLeft 5
        
        [153, 91, 25, 25], // walkRight 6
        [178, 91, 25, 25], // idleRight 7
        [203, 91, 25, 25], // walkRight 8
        
        [229, 91, 25, 25], // walkUp 9
        [255, 91, 25, 25], // idleUp 10
        [279, 91, 25, 25] // walkUp 11         
    ],
    animations: {
        idleDown:[1, 1, "idleDown"],
        walkDown:[0, 2, "walkDown", 0.08],
        idleLeft:[4, 4, "idleLeft"],
        walkLeft:[3, 5, "walkLeft", 0.08],
        idleRight:[7, 7, "idleRight"],
        walkRight:[6, 8, "walkRight", 0.08],            
        idleUp:[10, 10, "idleUp"],
        walkUp:[9,11, "walkUp", 0.08]
    }
};
var playerThreeSheet = new createjs.SpriteSheet(playerThreeData);
var bmBlue = new createjs.Sprite(playerThreeSheet);

//
var playerFourData = {
    images: ["../static/images/15bomberman.png"],
    frames: [
        // x, y, width, height, imageIndex*, regX* regY*
        [2, 119, 25, 25], // walkDown 0
        [27, 119, 25, 25], // idleDown 1
        [52, 119, 25, 25], // walkDown 2
        
        [77, 119, 25, 25], // walkLeft 3
        [102, 119, 25, 25], // idleLeft 4
        [127, 119, 25, 25], // walkLeft 5
        
        [152, 119, 25, 25], // walkRight 6
        [177, 119, 25, 25], // idleRight 7
        [202, 119, 25, 25], // walkRight 8
        
        [229, 119, 25, 25], // walkUp 9
        [254, 119, 25, 25], // idleUp 10
        [279, 119, 25, 25] // walkUp 11            
    ],
    animations: {
        idleDown:[1, 1, "idleDown"],
        walkDown:[0, 2, "walkDown", 0.08],
        idleLeft:[4, 4, "idleLeft"],
        walkLeft:[3, 5, "walkLeft", 0.08],
        idleRight:[7, 7, "idleRight"],
        walkRight:[6, 8, "walkRight", 0.08],            
        idleUp:[10, 10, "idleUp"],
        walkUp:[9,11, "walkUp", 0.08]
    }
};
var playerFourSheet = new createjs.SpriteSheet(playerFourData);
var bmRed = new createjs.Sprite(playerFourSheet);

var wallData = {  //added
    images: ["../static/images/14bomberman.png"],
    frames: [
        // x, y, width, height, imageIndex*, regX* regY*
        [13, 172, 25, 25], // solid / METAL   
        [41, 172, 25, 25], // semi-solid / WOOD              
    ],
    animations: {
        metalWall:[0],
        woodWall: [1]
    }
};
var wallSpriteSheet = new createjs.SpriteSheet(wallData); //added

var bombData = {
    images: ["../static/images/15bomberman.png"],
    frames: [
        // x, y, width, height, imageIndex*, regX* regY*
        [3, 254, 20, 20], // pulse 0
        [26, 254, 20, 20], // pulse 1
        [50, 254, 20, 20], // pulse 2
        [75, 254, 20, 20] // pulse 3      
    ],
    animations: {
        pulse:[0, 3, "pulse", 0.3]
    }
};
var bombSpriteSheet = new createjs.SpriteSheet(bombData);

var explosionData = {
    images: ["../static/images/15bomberman.png"],
    frames: [
        // x, y, width, height, imageIndex*, regX* regY*
        [3, 280, 20, 20], // pulse 0
        [26, 280, 20, 20], // pulse 1
        [50, 280, 20, 20], // pulse 2
        [75, 280, 20, 20] // pulse 3      
    ],
    animations: {
        explode:[0, 3, false, 0.3]
    }
};
var explosionSpriteSheet = new createjs.SpriteSheet(explosionData);
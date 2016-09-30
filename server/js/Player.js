module.exports = function Player(id, name, color, bitPosition){
	this.id = id;
	this.name = name;
	this.color = color;
	this.bitPosition = {x: bitPosition.x, y: bitPosition.y};
	this.width = 25;
	this.height = 25;
	// hit Rectangle UpperLeft = {x: 0, y: 0}
	// this.hitRect = {x: this.bitPosition.x, y: this.bitPosition.y,
	// 	            width: this.width, height: this.height};
	this.state = "idleDown";
	this.isDead = false;
	this.velocity = 8.3333333333;
	this.strength = 3; //bomb strength
	this.bombCapacity = 3;

	this.move = function(direction){
		if (direction == 'left'){
			this.bitPosition.x -= this.velocity;
			this.state = "walkLeft";
		}
		else if (direction == 'up'){
			this.bitPosition.y -= this.velocity;
			this.state = "walkUp";
		}
		else if (direction == 'right'){
			this.bitPosition.x += this.velocity;
			this.state = "walkRight";
		}
		else if (direction == 'down'){
			this.bitPosition.y += this.velocity;
			this.state = "walkDown";
		}
	}
}

// Player = Entity.extend({
//     id: null,
//     bitPosition: {x: null, y: null},
//     state: "idle",
//     isDead: false,
//     velocity: 2,
//     strength: 1,
//     bombCapacity: 1,
//     pic: null,
    

//     init: function (id, bitPosition){
//     	this.id = id;
//     	this.bitPosition.x = bitPosition.x;
//     	this.bitPosition.y = bitPosition.y;
//     }
    
// });
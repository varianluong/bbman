module.exports = function Explosion(id, position, TILESIZE){
	this.id = id;
	this.timer = 8; //10
	this.position = {x: position.x, y: position.y};
	this.bitPosition = {x: position.x * TILESIZE, y: position.y * TILESIZE};
	this.hitRect = {
		x: this.bitPosition.x,
		y: this.bitPosition.y,
        width: this.width,
        height: this.height
    };
}
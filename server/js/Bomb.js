module.exports = function Bomb(id, playerId, position, strength, TILESIZE) {
	this.id = id;
	this.playerId = playerId;
	this.bitPosition = {x: position.x * TILESIZE, y: position.y * TILESIZE};
	this.position = {x: position.x, y: position.y};
    this.width = TILESIZE;
    this.height = TILESIZE;
    this.hitRect = {x: this.bitPosition.x, y: this.bitPosition.y,
        width: this.width, height: this.height};
	this.strength = strength;
	this.timer = 45; //45~60

}
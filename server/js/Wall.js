module.exports = function Wall(id, position, material, TILESIZE){
    const WOOD = "WOOD";
    const METAL = "METAL";

    this.id = id; // needed?
    this.position = {x: position.x, y: position.y};  //hit collision representation
    this.bitPosition = {x: position.x * (TILESIZE), y: position.y * (TILESIZE)}; //drawn/render position
    this.width = TILESIZE;
    this.height = TILESIZE;  
    this.hitRect = {x: this.bitPosition.x, y: this.bitPosition.y,
                    width: this.width, height: this.height};
    this.material = material;  //WOOD, METAL
    if (material == WOOD) {
        this.state = "woodWall";
    }
    else {
        this.state = "metalWall";
    }
}
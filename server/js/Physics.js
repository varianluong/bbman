module.exports = function Physics(){


// /**
//  * Returns true if positions are equal.
//  */
// Utils.comparePositions = function(pos1, pos2) {
//     return pos1.x == pos2.x && pos1.y == pos2.y;
// };


	/**
	 * Convert bitmap pixels position to entity on grid position.
	 */
	this.convertToEntityPosition = function(pixels) {
	    var position = {};
	    position.x = Math.round(pixels.x / gameEngine.TILESIZE);
	    position.y = Math.round(pixels.y /gameEngine.TILESIZE);
	    return position;
	};

	/**
	 * Convert entity on grid position to bitmap pixels position.
	 */
	this.convertToBitmapPosition = function(entity) {
	    var position = {};
	    position.x = entity.x * gameEngine.TILESIZE;
	    position.y = entity.y * gameEngine.TILESIZE;
	    return position;
	};

// /**
//  * Removes an item from array.
//  */
// Utils.removeFromArray = function(array, item) {
//     for (var i = 0; i < array.length; i++) {
//         if (item == array[i]) {
//             array.splice(i, 1);
//         }
//     }
//     return array;
// };
}
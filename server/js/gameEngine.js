module.exports = function GameEngine(server) {
    var io = require('socket.io').listen(server),
        tracer = require('tracer').colorConsole();
    // Require game objects
    var Player = require("./Player.js"),
        Wall = require("./Wall.js"),
        Bomb = require("./Bomb.js"),
        Explosion = require("./Explosion.js");
    //var entity = [];
    var _this = this;
    _this.bombs = [];
    _this.bombsToRemove = [];
    _this.players = {};
    _this.playersToRemove = [];
    _this.walls = [];
    _this.wallsToRemove = [];
    _this.explosions = [];
    _this.explosionsToRemove = [];
    _this.totalPlayers = 0;
    _this.totalPlayersCounter = 0;
    var wallsCounter = 0;  //the total # of walls created so far; used to generate a unique identifier
    var bombsCounter = 0;
    var explosionsCounter = 0;
    const GAMECAPACITY = 4;
    const TILESIZE = 25;     //changed
    const GAMECLOCK = 60;
    //var powerups = [];
    //var connections = []; //sockets
    // var actionsQueue = new Queue();
    var actionsQueue = [];
    var playerColors = ["white", "black", "blue", "red"]; // <<<<<<<<<<

    var board = {};
    board[0]  = "MMMMMMMMMMMMMMMMM";
    board[1]  = "M...............M"; //"M..w....w....w..M";
    board[2]  = "M.MwM.M.M.M.MwM.M";
    board[3]  = "Mww..w.....w..wwM";
    board[4]  = "M.MwM.M.M.M.MwM.M";
    board[5]  = "Mw..w..w.w..ww.wM";
    board[6]  = "M.M.M.M.M.M.M.M.M";
    board[7]  = "Mw..w..w.w..ww.wM";
    board[8]  = "M.MwM.M.M.M.MwM.M";
    board[9]  = "Mww..w.....w..wwM";
    board[10] = "M.MwM.M.M.M.MwM.M";
    board[11] = "M...............M"; //"M..w....w....w..M"
    board[12] = "MMMMMMMMMMMMMMMMM";

    setInterval(update, GAMECLOCK);
    // connect();
    init();

    // function connect(){
    //connection listener; detect new connect
    io.sockets.on("connection", function (socket) {

        // connections.push(socket);
        socket.on("player_join", function(playername) {
            // console.log("totalPlayers");
            // console.log(_this.totalPlayers);
            // console.log("GAMECAPACITY");
            // console.log(GAMECAPACITY);

            // Game not full
            if (_this.totalPlayers < GAMECAPACITY) {
                console.log("GAMECAPACITY " + GAMECAPACITY);
                var player_id = socket.id;  //socket_id
                var playerColor; // = "WHITE";
                
                // find first available slot
                // 
                //   if yes, then keep looking for the free color
                //   if no, then that is our free color
                // for (var i = 0; i < GAMECAPACITY; i++) { // go through all the colors ...
                //     var color = playerColors[i];         // and pick one color from all possible ones
                //     console.log("color=", color);
                //     var colorWasMatched = false;
                //     for (k in _this.players) {             // go through all the players ... 
                //         var player = _this.players[k];     // to see if ANY of them are of that color
                //         if (color == player.color) {
                //             colorWasMatched = true;
                //             break;
                //         }
                //     }
                //     if (!colorWasMatched) {
                //         playerColor = color;
                //         break;
                //     }
                // }

                switch(totalPlayersCounter % GAMECAPACITY) { // <<< WRONG: round-robin
                //switch (playerColor) {
                    case 0:
                        var player = new Player(player_id, playername, playerColors[0], {x: 26, y:26}); // <<<{x: 26, y:26}
                        break;
                    case 1:
                        var player = new Player(player_id, playername, playerColors[1], {x: 376, y:276}); // <<<{x: 376, y:276}
                        break;
                    case 2:
                        var player = new Player(player_id, playername, playerColors[2], {x: 376, y:26}); // <<<{x: 376, y:26}
                        break;
                    case 3:
                        var player = new Player(player_id, playername, playerColors[3], {x: 26, y:276}); //<<<{x: 26, y:276}
                        break;            
                }
                totalPlayersCounter++;
                _this.totalPlayers++;
                console.log("totalPlayers", _this.totalPlayers);
                console.log(player);
                
                _this.players[player_id] = player; // add player (create a new player)
                // console.log("this is the players hash:");
                // console.log("line34");
                // console.log(_this.players);
                // console.log("\n\n");
                // console.log(getGameState());
                socket.emit("join_ok", player, getGameState()); // emit to player that you're ok to join; pass back to player game objects/states 
                socket.broadcast.emit("new_player", player, getGameState());

            }
            else {
                socket.emit("game_full") // emit to player game is full, try again later.
            }
        });

        socket.on("player_action", function(player_id, action) {

            //action is "move left", "place bomb" (does not specify which key or details about input)
            //
            newPlayerAction(player_id, action);
        });

        socket.on("disconnect", function(){
            console.log(Object.keys(io.sockets.connected));
            console.log("#### This is socket id" + socket.id);
            // console.log("this is players" + players);
            if (_this.players && _this.players[socket.id]) {
                _this.playersToRemove.push(socket.id);
                console.log("deleting................");
                console.log(_this.players[socket.id]);
                delete _this.players[socket.id]; // watch out!!!
                console.log(_this.players[socket.id]);
                console.log("##### Player " + socket.id + " disconnecting....");
                console.log(_this.playersToRemove);
                _this.totalPlayers -= 1;
                // if (_this.totalPlayers < 0){
                //     _this.totalPlayers = 0;
                // }
            }
        }); 
    });  //END io.sockets.on("connection"...


    // initialization function 
    function init() {
        // initial game state
        console.log("Initialization of game...");
        // place all initial walls on board (randomize material==WOOD ones, never stuck)
        for (var y = 0; y < 13; y++) {
            for (var x = 0; x < 17; x++) {
                if (board[y].charAt(x).toUpperCase() == 'M')
                    // walls.push(new Wall(wallsCounter++, {x: x, y: y}, {width: TILESIZE, height: TILESIZE}, Wall.METAL, TILESIZE));
                    walls.push(new Wall(wallsCounter++, {x: x, y: y}, "METAL", TILESIZE));
                else if (board[y].charAt(x).toUpperCase() == 'W')
                    //walls.push(new Wall(wallsCounter++, {x: x, y: y}, {width: TILESIZE, height: TILESIZE}, Wall.WOOD, TILESIZE));
                    walls.push(new Wall(wallsCounter++, {x: x, y: y}, "WOOD", TILESIZE));
            }
        }
        //initialize the METAL (solid) walls
        //horizontal walls
        // for (var x = 0; x < 17; x++) {
        //     for (var j = 0; j < 2; j++) {
        //         if (j==0)
        //             y = 0;
        //         else
        //             y = 12;
        //         walls.push(new Wall(wallsCounter++, {x: x, y: y}, {width: TILESIZE, height: TILESIZE}, "METAL", TILESIZE));
        //     }
        // }

        // //vertical walls
        // for (var y = 1; y < 12; y++) {
        //     var x = 0;
        //     walls.push(new Wall(wallsCounter++, {x: x, y: y}, {width: TILESIZE, height: TILESIZE}, "METAL", TILESIZE));
        //     x = 16;
        //     walls.push(new Wall(wallsCounter++, {x: x, y: y}, {width: TILESIZE, height: TILESIZE}, "METAL", TILESIZE));
        // }
        
        // //intermediate walls
        // for (var a = 1; a <= 7; a++) { // 7 horizontal
        //     for (var b = 1; b <= 6; b++) { // 6 veritcal
        //         walls.push(new Wall(wallsCounter++, {x: 2*a, y: 2*b}, {width: TILESIZE, height: TILESIZE}, "METAL", TILESIZE));
        //     }
        // }
    }

    function newPlayerAction (player_id, action) {
        actionsQueue.push({player_id: player_id, action: action}); //enqueue the action to be processed later during update
    }

    // Updating game state, runs every tick event
    function update()
    {
        _this.bombsToRemove = []; // reset the bombs to remove every tick;
        _this.explosionsToRemove = []; // reset the explosions to remove every tick;
        //_this.playersToRemove = [];  // we should clear this! but there is a BUG right now, so fix this later
        _this.wallsToRemove = [];
        // process server messages (queue/array?) to update game board/states
        var action;
        // check input in actionsQueue for user input
        if(actionsQueue.length > 0){
            action = actionsQueue.shift();
            console.log("\n\n\naction=" + action.action);

            // console.log("  Player bitPosition=");
            // console.log(_this.players[action.player_id].bitPosition);
            // console.log("  Player hitRect.......");
            console.log("action.player_id="+ action.player_id);

            var player = _this.players[action.player_id];
            // var playerHitRect = {x: player.bitPosition.x, y: player.bitPosition.y, width: player.width-3, height: player.height-3};

            //console.log(convertBitPosToPos(_this.players[action.player_id].bitPosition));
            //change state of player accordingly (idle/not idle)
            // check
            // 1. If player will hit a wall, do not allo him/her to move in that dir
            // 2. 2a. If player is standing on a bomb, if so allow him/her to walk off
            //    2b. Otherwise, if a player will hit a bomb, don't let him/her move in that dir
            if (player){
                switch(action.action){
                    case "moveLeft": 
                        if (testIfPlayerWillHitAWall(player, -player.velocity, 0))
                            break;
                        if (testIfPlayerWillHitABomb(player, -player.velocity, 0))
                            break;
                        _this.players[action.player_id].move('left');
                        break;
                    case "moveUp": 
                        if (testIfPlayerWillHitAWall(player, 0, -player.velocity))
                            break;
                        if (testIfPlayerWillHitABomb(player, 0, -player.velocity))
                            break;
                        _this.players[action.player_id].move('up');
                        break;
                    case "moveRight": 
                        if (testIfPlayerWillHitAWall(player, player.velocity, 0))
                            break;
                        if (testIfPlayerWillHitABomb(player, player.velocity, 0))
                            break;
                        _this.players[action.player_id].move('right');
                        break;
                    case "moveDown":
                        if (testIfPlayerWillHitAWall(player, 0, player.velocity))
                            break;
                        if (testIfPlayerWillHitABomb(player, 0, player.velocity))
                            break;
                        _this.players[action.player_id].move('down');
                        break;
                    case "idleLeft": // left
                        _this.players[action.player_id].state = "idleLeft";
                        break;
                    case "idleUp": // up
                        _this.players[action.player_id].state = "idleUp";
                        break;
                    case "idleRight": // right
                        _this.players[action.player_id].state = "idleRight";
                        break;
                    case "idleDown": // down
                        _this.players[action.player_id].state = "idleDown";
                        break;
                    case "placeBomb": // spacebar
                        placeBomb(_this.players[action.player_id]);
                        break;
                }
            }
        }
            // client: emit user input to server.
            // client: new bomb placements
                // bombs.push(new Bomb(players[0].id, players[0].position));
        // for every player
            // check players state
            // if idle, ...
            // if not idle:
               // check for collisions with walls and bombs. if no collision allow...
               // player position update: players[id].move(direction)
// #################### BOMB UPDATES
        // for every bomb
            // advance bomb timer
            // if bomb timer = 0, it is set to explode...
                // get explosions array for bomb
                // update gameboard with explosion from explosions array
                // remove bomb
        for(var i = 0; i < _this.bombs.length; i++){
            // iterating through bombs
            // if timer hits 0
            if(_this.bombs[i].timer == 0){
                // explode the bomb
                explode(_this.bombs[i]);
                // remove the bomb from the array
                _this.bombsToRemove.push(_this.bombs[i].id);
                if (_this.players[_this.bombs[i].playerId])
                    _this.players[_this.bombs[i].playerId].bombCapacity++;
                _this.bombs.splice(i, 1);
            }
            // otherwise, advance the bomb timer
            else{
                _this.bombs[i].timer -= 1;
            }
        }
// #################### EXPLOSION UPDATES        
        // for every explosions
            // check collision with players --> player death (animation timer)
            // advance explosion timer 
            // remove walls.material == WOOD
                // power up placements
        // console.log("alive");
        // console.log(_this.players);
        for(var i = 0; i < _this.explosions.length; i++){
            // iterating through explosions
            // if timer hits 0
            if(_this.explosions[i].timer == 0){
                // remove the explosion from the array
                _this.explosionsToRemove.push(_this.explosions[i].id);
                _this.explosions.splice(i, 1);
            }
            // otherwise, advance the explosion timer and remove anything that it touchesssssss1!!!
            else{
                _this.explosions[i].timer -= 1;
                removeEntitiesAt(_this.explosions[i].position);
            }
        }


        io.emit("gameState_update", getGameState()); // broadcast the current gameState
    }

    function convertBitPosToPos(bitPosition) {
        return ({x: Math.round(bitPosition.x / TILESIZE), y: Math.round(bitPosition.y / TILESIZE) });
    }

    function convertPosToBitPos(position) {
        return ({x: position.x * TILESIZE, y: position.y * TILESIZE});
    }

    function getPlayerhitRect(player) {
        return {x: player.bitPosition.x, y: player.bitPosition.y, width: player.width-3, height: player.height-3};
    }

    // test if a move in x (dx) and y (dy) directions will result in moving into a wall 
    function testIfPlayerWillHitAWall(player, dx, dy) {
        var playerHitRect = getPlayerhitRect(player);

        playerHitRect.x += dx;
        playerHitRect.y += dy;
        // console.log("playerHitRect.x", playerHitRect.x);
        // console.log("playerHitRect.y", playerHitRect.y);
        // console.log("dx", dx)
        // console.log("dy", dy)
        for (var i=0; i< _this.walls.length; i++) {
            // console.log("## wall hitRect");
            // console.log(_this.walls[i].hitRect);
            if (isBitMapCollision(playerHitRect, _this.walls[i].hitRect)) {
                // console.log("hitrects");
                // console.log(playerHitRect);
                // console.log(_this.walls[i].hitRect);
                return true;
            }
        }
        return false;
    }

    // test if a move in x (dx) and y (dy) directions will result in moving into a bomb, but allow the player to move off if s/he's already standing on one 
    function testIfPlayerWillHitABomb(player, dx, dy) {
        var playerHitRect;

        // for each bomb,
        for (var i = 0; i< _this.bombs.length; i++) {
            var bomb = _this.bombs[i];
            // console.log("## bomb hitRect");
            // console.log(bomb.hitRect);

            //if already stepping over the bomb (e.g., the person who dropped it), skip checking that bomb
            playerHitRect = getPlayerhitRect(player);
            if (!isBitMapCollision(playerHitRect, bomb.hitRect)) {
                playerHitRect.x += dx;
                playerHitRect.y += dy;
                if (isBitMapCollision(playerHitRect, bomb.hitRect)) {
                    // console.log("hitrects");
                    // console.log(playerHitRect);
                    // console.log(_this.bombs[i].hitRect);
                    return true;
                }
            }
        }
        return false;
    }

    function isBitMapCollision(rect1, rect2) {
        // console.log("rect1-left-edge hits rect2-right-edge=", (rect1.x < rect2.x + rect2.width));
        // console.log("rect1-right-edge hits rect2-left-edge=", (rect1.x + rect1.width > rect2.x));
        // console.log("rect1.x + rect1.width=", rect1.x + rect1.width);
        // console.log(" rect2.x=", rect2.x)
        // console.log("rect1");
        // console.log(rect1);
        // console.log("rect2");
        // console.log(rect2);

        // return (rect1.x < rect2.x + rect2.width &&
        //         rect1.x + rect1.width > rect2.x &&
        //         rect1.y < rect2.y + rect2.height &&
        //         rect1.height + rect1.y > rect2.y);
        return (Math.abs(rect1.x - rect2.x) * 2 <= (rect1.width + rect2.width)) &&
         (Math.abs(rect1.y - rect2.y) * 2 <= (rect1.height + rect2.height));
    }    

    function getGameState(){
        var gameState = {};
        gameState.players = _this.players;
        // if (_this.playersToRemove.length > 0) {
        //     console.log("************** playersToRemove ************");
        //     console.log(_this.playersToRemove);
        // }        
        gameState.playersToRemove = _this.playersToRemove; 
        gameState.walls = _this.walls; 
        gameState.wallsToRemove = _this.wallsToRemove; 
        gameState.bombs = _this.bombs;
        gameState.bombsToRemove = _this.bombsToRemove;
        gameState.explosions = _this.explosions;
        gameState.explosionsToRemove = _this.explosionsToRemove;
        // console.log("line172 setInterval");
        // console.log(gameState.walls);
        return gameState;
    }

    function placeBomb(player){
        var bombPos = convertBitPosToPos(player.bitPosition);
        console.log("bomb dropped here");
        console.log(bombPos);
        // var bombBitPos = convertPosToBitPos(convertBitPosToPos(player.bitPosition));
        // // make new bomb:
            // set id to player.id
            // set location to player location
            // set strength to player strength
            // increment the total bombs (counter) unique id
        if (player.bombCapacity > 0 && // if player has bombs left
            !bombAt(bombPos) )      // no bombs currently at this position
        {
            var newBomb = new Bomb(bombsCounter++, player.id, bombPos, player.strength, TILESIZE);
            _this.bombs.push(newBomb); // push new bomb into bomb array (list of bombs to update)
            player.bombCapacity--;
        }
    }

    function explode(bomb) {
        getExplodeTiles(bomb);
        // console.log("\nThese are the exploding tiles")
        // console.log(_this.explosions);
    }

    function getExplodeTiles(bomb){
        var bombPosition = convertBitPosToPos(bomb.bitPosition);
        // console.log("\n\nthis is bombPosition");
        // console.log(bombPosition.x);
        // console.log(bombPosition.y);
        var directions = {
            '0': {"dx": 0, "dy": -1}, // up
            '1': {"dx": 1, "dy": 0}, // right
            '2': {"dx": 0, "dy": 1}, // down
            '3': {"dx": -1, "dy": 0} // left
        }
        for (var i = 0; i < 4; i++){
            for(var j = 1; j <= bomb.strength; j++){
                var test = {
                        x: bombPosition.x + directions[i].dx * j,
                        y: bombPosition.y + directions[i].dy * j
                    }
                // console.log(test);
                var wall = wallAt(test);                
                if (wall && wall.material == "METAL"){ //stop propogating explosions when we hit a metal wall
                    // console.log(wall.material);
                    break;
                }
                else if (wall) { // wall.material == 'wood'
                    // make new object
                    var newExplosion = new Explosion(explosionsCounter, test, TILESIZE);
                    _this.explosions.push(newExplosion); //intend to remove the wooden wall when explosion expires
                    explosionsCounter++;
                    break;
                }
                //keep propagating
                var newExplosion = new Explosion(explosionsCounter, test, TILESIZE);
                _this.explosions.push(newExplosion);
                explosionsCounter++;
                
            }
        }
        // bomb itself
        var newExplosion = new Explosion(explosionsCounter, bombPosition, TILESIZE);
        _this.explosions.push(newExplosion);
        explosionsCounter++;
        // return explosions // with all the tiles gameEngine has to check for player deaths and tile removals
    }

    function removeEntitiesAt(position) {
        var entities = entitiesAt(position);
        for(var i = 0; i < entities.length ; i++){
            //if entitiesAtPosition[i] == player
            if(entities[i] instanceof Player){
                _this.playersToRemove.push(entities[i].id);
                delete _this.players[entities[i].id];
                console.log("playersToRemove");
                console.log(playersToRemove);
                console.log("removing players");
                _this.totalPlayers -= 1;
            }
            else if(entities[i] instanceof Bomb){
                //set that bomb.timer = 0
                entities[i].timer = 0;
            }
            else if(entities[i] instanceof Wall){
                _this.wallsToRemove.push(entities[i].id);
                _this.walls.splice(_this.walls.indexOf(entities[i]),1);
            }
        }
    }

    function entitiesAt(position) {
        var entities = [];
        // check players at this position
        var players = playersAt(position);
        for(var i = 0; i < players.length; i++){
            entities.push(players[i]);    
        }
        // check walls at this position
        var wall = wallAt(position);
        if (wall)
            entities.push(wall);
        // check bombs at this position
        var bomb = bombAt(position);
        if (bomb)
            entities.push(bomb);
        // console.log("**************************");
        // console.log(entities);
        // console.log("**************************");
        return entities;
    }

    function bombAt(position) {
        for(var i = 0; i < bombs.length; i++){
            if(bombs[i].position.x == position.x && bombs[i].position.y == position.y){
                return bombs[i];
            }
        }
        return null;
    }

    function playersAt(position) {
        var players = [];
        // for(var i = 0; i < _this.players.length; i++){
        for(i in _this.players){
            var playerPosition = convertBitPosToPos(_this.players[i].bitPosition)
            if(playerPosition.x == position.x && playerPosition.y == position.y){
                console.log("player found!");
                players.push(_this.players[i]);
            }
        }
        return players;
    }

    function wallAt(position) {
        for(var i = 0; i < walls.length; i++){
            if(walls[i].position.x == position.x && walls[i].position.y == position.y){
                return walls[i];
            }
        }
        return null;
    }
}
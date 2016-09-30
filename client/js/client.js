function init() {
    var stage = new createjs.Stage("gameCanvas");
    //var gameState; //board
    var socket; 
    var gameOK = false;
    var player;
    var players; // mapping players id (socket.id) <-> corresponding bitmap (rendered object)
    var playersbmpMap = {};
    var bombs;
    var walls;
    var wallsbmpMap = {}; //map of wall id <-> corresponding bitmap (rendered object)
    var bombsbmpMap = {}; // map of bomb id <-> corresponding bitmap (rendered bomb)
    var explosionsbmpMap = {}; // map of explosion id <-> corresponding bitmap (rendered explosion)
    var explosions;

    socket = io.connect();    // make connection to server
    //var playerName = get input for playerName
    do {
        playerName = prompt("What is your name, Mr./Mrs. bomberman?");  
    }
    while(playerName && playerName.length < 1);
    socket.emit("player_join", playerName);

    socket.on("new_player", function(player, gameState){
        // console.log("new_player from other socket");
        switch(player.color){  // <<<<<<<<<<
            case "white":
                // console.log("white added");
                bmWhite.x = player.bitPosition.x;
                bmWhite.y = player.bitPosition.y;
                console.log("First player ID");
                console.log(player.id);
                playersbmpMap[player.id] = bmWhite;
                stage.addChild(bmWhite);
                break;
            case "black":
                // console.log("black added");
                bmBlack.x = player.bitPosition.x;
                bmBlack.y = player.bitPosition.y;
                playersbmpMap[player.id] = bmBlack;
                stage.addChild(bmBlack);
                break;
            case "blue":
                // console.log("blue added");
                bmBlue.x = player.bitPosition.x;
                bmBlue.y = player.bitPosition.y;                
                playersbmpMap[player.id] = bmBlue;
                stage.addChild(bmBlue);
                break;
            case "red":
                // console.log("red added");
                bmRed.x = player.bitPosition.x;
                bmRed.y = player.bitPosition.y;                 
                playersbmpMap[player.id] = bmRed;
                stage.addChild(bmRed);
                break;
        }
        console.log("line57");
        console.log(playersbmpMap);        
    });
    socket.on("game_full", function(){
        alert("Game is full!");
    });

    socket.on("join_ok", function(player, gameState) {
        // init
        player = player;
        // console.log(player.id);
        players = gameState.players;

        // attach event listeners for all commands
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        // add your sprites in order to render them (things in front are added last)

        //add your sprites in order to render them
        for (var i=0; i < gameState.walls.length; i++) {
            var wall = gameState.walls[i];
            // console.log("***************** wall.id");
            // console.log(wall.id);
            var sprite = new createjs.Sprite(wallSpriteSheet);
            sprite.x = wall.bitPosition.x;
            sprite.y = wall.bitPosition.y;
            wallsbmpMap[wall.id] = sprite;
            stage.addChild(sprite);
            // console.log("***************** wallsbmpMap[wall.id]:");
            // console.log(wallsbmpMap[wall.id]);
        }

        for (p in gameState.players){
            // console.log(gameState.players[p]);
            switch(gameState.players[p].color){  // <<<<<<<<<<
                case "white":
                    console.log("white added");
                    bmWhite.x = gameState.players[p].bitPosition.x;
                    bmWhite.y = gameState.players[p].bitPosition.y;
                    playersbmpMap[gameState.players[p].id] = bmWhite;
                    stage.addChild(bmWhite);
                    break;
                case "black":
                    console.log("black added");
                    bmBlack.x = gameState.players[p].bitPosition.x;
                    bmBlack.y = gameState.players[p].bitPosition.y;
                    playersbmpMap[gameState.players[p].id] = bmBlack;
                    stage.addChild(bmBlack);
                    break;
                case "blue":
                    console.log("blue added");
                    bmBlue.x = gameState.players[p].bitPosition.x;
                    bmBlue.y = gameState.players[p].bitPosition.y;                    
                    playersbmpMap[gameState.players[p].id] = bmBlue;
                    stage.addChild(bmBlue);
                    break;
                case "red":
                    console.log("red added");
                    bmRed.x = gameState.players[p].bitPosition.x;
                    bmRed.y = gameState.players[p].bitPosition.y;                    
                    playersbmpMap[gameState.players[p].id] = bmRed;
                    stage.addChild(bmRed);
                    break;
            }
            console.log("line121");
            console.log(playersbmpMap);
        }
        
        // console.log("line31");
        // console.log("\n\n\n");
        // console.log(gameState);
        removePlayers(gameState.playersToRemove);
        render(gameState);
        // console.log("line35");
        stage.update();
        gameOK= true;


        socket.on("gameState_update", function(gameState) {
            // console.log("line39");
            // console.log(gameState);

            if (gameOK) {    //changed
                removePlayers(gameState.playersToRemove);
                render(gameState);
                stage.update();
            }
        });

        function removePlayers(playersToRemove) {
            // remove players that died/disconnected
            
            // if (playersToRemove.length > 0) {
            //     console.log("#### gameState.playersToRemove:");
            //     console.log(playersToRemove);
            // }

            for(var i = 0; i < playersToRemove.length; i++){
                console.log("These are players to remove");
                console.log(playersToRemove);
                // console.log(playersbmpMap);
                stage.removeChild(playersbmpMap[playersToRemove[i]]);
                if (player.id == playersToRemove[i]){
                    alert("You are toast!  Try again.");
                    gameOK = false;
                }
            }

        }

// ####################
        function render(gameState){
            // console.log("alive");
            // render all players
            // console.log(players);

            for (p in gameState.players){
                // console.log(gameState.players[p]);
                switch(gameState.players[p].color){  // <<<<<<<<<<
                    case "white":
                        // console.log("white moved");
                        bmWhite.x = gameState.players[p].bitPosition.x;
                        bmWhite.y = gameState.players[p].bitPosition.y;
                        bmWhite.gotoAndPlay(gameState.players[p].state);
                        // stage.update();
                        break;
                    case "black":
                        // console.log("black moved");

                        bmBlack.x = gameState.players[p].bitPosition.x;
                        bmBlack.y = gameState.players[p].bitPosition.y;
                        bmBlack.gotoAndPlay(gameState.players[p].state);
                        // stage.update();
                        break;
                    case "blue":
                        // console.log("blue moved");
                        bmBlue.x = gameState.players[p].bitPosition.x;
                        bmBlue.y = gameState.players[p].bitPosition.y;
                        bmBlue.gotoAndPlay(gameState.players[p].state);
                        // stage.update();
                        break;
                    case "red":
                        // console.log("red moved");
                        bmRed.x = gameState.players[p].bitPosition.x;
                        bmRed.y = gameState.players[p].bitPosition.y;
                        bmRed.gotoAndPlay(gameState.players[p].state);
                        // stage.update();
                        break;
                }
            }
        
            // render the walls
            for (var i = 0; i < gameState.walls.length; i++) {
                var wall = gameState.walls[i];
                var wallTile = wallsbmpMap[wall.id];
                wallTile.gotoAndPlay(wall.state);
            }
            // remove walls that melted
            for(var i = 0; i < gameState.wallsToRemove.length; i++){
                stage.removeChild(wallsbmpMap[gameState.wallsToRemove[i]]);
            }


            // render all bombs
            // console.log("There are this many bombs on map "+ gameState.bombs.length);
            for (var i = 0; i < gameState.bombs.length; i++){
                var bomb = gameState.bombs[i];
                if(!bombsbmpMap[bomb.id]){ // if bomb is not in mapping, then we haven't rendered yet
                    var bombSprite = new createjs.Sprite(bombSpriteSheet);
                    bombSprite.x = bomb.bitPosition.x;
                    bombSprite.y = bomb.bitPosition.y;
                    bombsbmpMap[bomb.id] = bombSprite; // this is the sprite for which to remove this sprite later
                    stage.addChildAt(bombSprite, 0);
                    bombSprite.gotoAndPlay("pulse");
                }
            }
            // remove bombs that exploded
            for(var i = 0; i < gameState.bombsToRemove.length; i++){
                stage.removeChild(bombsbmpMap[gameState.bombsToRemove[i]]);
            }
            //render all explosions
            for (var i = 0; i < gameState.explosions.length; i++){
                var explosion = gameState.explosions[i];
                if(!explosionsbmpMap[explosion.id]){ // if explosion is not in mapping, then we haven't rendered yet
                    var explosionSprite = new createjs.Sprite(explosionSpriteSheet);
                    explosionSprite.x = explosion.bitPosition.x;
                    explosionSprite.y = explosion.bitPosition.y;
                    explosionsbmpMap[explosion.id] = explosionSprite; // this is the sprite for which to remove this sprite later
                    stage.addChild(explosionSprite);
                    explosionSprite.gotoAndPlay("explode");
                }
            }
            // remove explosions that expired
            for(var i = 0; i < gameState.explosionsToRemove.length; i++){
                stage.removeChild(explosionsbmpMap[gameState.explosionsToRemove[i]]);
            }

            stage.update();
        }

        function handleKeyDown(key){
            if(key.keyCode == 37 || key.keyCode == 38 || key.keyCode == 39 || key.keyCode == 40 || key.keyCode == 32){
                console.log("key down is: "+key.keyIdentifier);

                switch(key.keyCode) {
                    case 37: // left
                        socket.emit("player_action", player.id, "moveLeft");
                        break;
                    case 38: // up
                        socket.emit("player_action", player.id, "moveUp");
                        break;
                    case 39: // right
                        socket.emit("player_action", player.id, "moveRight");
                        break;
                    case 40: // down
                        socket.emit("player_action", player.id, "moveDown");
                        break;
                    case 32: // space
                        socket.emit("player_action", player.id, "placeBomb");
                        break;
                }
            }

        }
        function handleKeyUp(key){
            if(key.keyCode == 37 || key.keyCode == 38 || key.keyCode == 39 || key.keyCode == 40 || key.keyCode == 32){
                console.log("key up is: "+key.keyIdentifier);
                switch(key.keyCode) {
                    case 37: // left
                        socket.emit("player_action", player.id, "idleLeft");
                        break;
                    case 38: // up
                        socket.emit("player_action", player.id, "idleUp");
                        break;
                    case 39: // right
                        socket.emit("player_action", player.id, "idleRight");
                        break;
                    case 40: // down
                        socket.emit("player_action", player.id, "idleDown");
                        break;
                    case 32: // space
                        socket.emit("player_action", player.id, "placeBomb");
                        break;
                }
            }
        }
    });
    


    socket.on("game_full", function() {
        // render waiting for available room page
    });
        

    // user input from event listeners (for different input: keys, mouse clicks, etc.)
    // Depending on the input, socket.emit("player_action", player_id, action); e.g., socket.emit("player_action", "moveup")

}

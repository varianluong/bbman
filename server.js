// require express and path
var express = require("express");
var path = require("path");
// create the express app
var app = express();
// static content 
app.use(express.static(path.join(__dirname, "client")));
// set up views folder
app.set('views', path.join(__dirname, 'client'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
	res.render("CDM");
});


var server = app.listen(8000, function() {
    console.log("listening on port 8000");
});


// var GameEngine = require("./server/js/gameEngine.js");
// var gameEngine = new GameEngine(io);
require("./server/js/gameEngine.js")(server);





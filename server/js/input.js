document.addEventListener('keydown', handleKeyDown);

function handleKeyDown(key){
	console.log("key");
	switch(key) {
		case 37:
			console.log("move left");
			break;
		case 38:
			console.log("move up");
			break;
		case 39:
			console.log("move right");
			break;
		case 40:
			console.log("move down");
			break;	
	}
}
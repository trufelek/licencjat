function startGame(level, points, lives){
	game.init(level, points, lives);

	 $(document).keydown(function(e){
	    game.keyboard[e.keyCode] = true;
	});

	$(document).keyup(function(e){
	    game.keyboard[e.keyCode] = false;
	});
	

	var gameLoop = function(){
		var inactive = true;

		if(game.keyboard[37]) { 
	   		player.move('left');
	   		inactive = false;
	 	}
	 	//strzałka w prawo
	 	if(game.keyboard[39]) { 
	   		player.move('right');
	   		inactive = false;
	 	}
	 	//strzałka w górę
	 	if(game.keyboard[38]) { 
	   		player.move('jump');
	   		inactive = false;
	   	}

	 	//brak akcji
	   	if(inactive){
	   		player.move('stand');
	   	}

	   	//akutalizuje pozycję i animację gracza
	   	player.update();
	   	game.animate();
	}

	game.loop = setInterval(gameLoop, 30);

};

$('document').ready(function(){
	$('#start h1').on('click', function(){
		startGame('level1', 0, 3);
	});
});
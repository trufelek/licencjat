function startGame(level){
	game.init(level);

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
	   	//strzałka w dół
	 	if(game.keyboard[40]) { 
	   		player.move('down');
	   		inactive = false;
	   	}

	   	//spadanie
	   	if (game.fall == true){
	 		player.move('fall');
	 	}

	 	//brak akcji
	   	if(inactive){
	   		player.move('stand');
	   	}

	   	//akutalizuje pozycję i animację gracza
	   	player.update();
	   	game.animate();

	 	//poruszające się platformy
	 	$('#board').find('.tile.platform').animate({left: "-=160"}, 5000).animate({left: "+=160"}, 5000);

	 	//postać porusza się wraz z platformą jeśli na niej stoi bezczynnie
	 	if(game.platform == true && game.keyboard[39] == false && game.keyboard[37] == false){
	 		console.log('on platform!');
	 		player.x = $('#board').find('.tile.platform').position().left;
	 		player.div.css('left', player.x + 'px');
	 	}
	}
	game.loop = setInterval(gameLoop, 30);

};

$('document').ready(function(){
	$('#start h1').on('click', function(){
		startGame('level1');
	});
});
$(function(){
	game = {
		height: 600,
		width: 800,
		keyboard: [],
		points: 0,
		collision: false,
		fall: false,
		climb: false,
		platform: false,
		collide: function(player){
			game.collision = false;
			game.climb = false;
			game.platform = false;
			game.fall = false;
			$('.tile').each(function(i, tile){
				var tile_x = $(tile).position().left;
				var tile_y = $(tile).position().top;
				var tile_w = $(tile).width();
				var tile_h = $(tile).height();

				if((player.x + player.w > tile_x) && (player.x < tile_x + tile_w) && (player.y + player.h > tile_y) && (player.y < tile_y + tile_h)){
					if($(tile).hasClass('diamonds')){
						console.log('diamond!');
						player.loot(tile);
					}else if($(tile).hasClass('spikes')){
						console.log('spikes!');
					}else if($(tile).hasClass('ladder')){
						game.climb = true;
					}else{
						game.collision = true;
						console.log('collide!');
						return false;
					}
				}else if((player.x + player.w > tile_x) && (player.x < tile_x + tile_w) && (player.y + player.h >= tile_y) && (player.y <= tile_y + tile_h)){
					if($(tile).hasClass('ladder')){
						game.climb = true;
					}else if($(tile).hasClass('platform')){
						game.platform = true;
					}
				}else if((player.x + player.w > tile_x) && (player.x < tile_x + tile_w) && (player.y +  player.h < tile_y)){
					if(player.status != 'climbing'){
						game.fall = true;
						return false;
					}
				}
				
				
			});
		}
	};

	sprite = {
		height: 80,
		width: 80
	};

	/* funkcja inicjująca gre */
	//wczytuje tło gry
	$('body').height(window.innerHeight - 50);
	$('#game').append('<div id="board"></div>');
	$('#game').append('<div id="score">Punkty: <span id="points">0</span></div>');
	$('#board').append('<div class="background"></div>');


	//dodaje bohatera
	var player = {
		div: $('<div id="player"></div>'),
		status: 'stand',
		move: function(action){
			player.x = player.div.position().left;
	 		player.y = player.div.position().top;
	 		player.h = player.div.height();
	 		player.w = player.div.width();
			switch(action){
				//ruch w lewo
				case 'left':{
					setInterval(player.animate('left'), 30);
					if( player.x > 400 && $('div.last').position().left === 720){

						player.x -= 10;
						game.collide(player);
						if(!game.collision && player.status != 'climbing'){
							player.div.css('left', player.x + 'px');
							player.status = 'walk';
						}
			   		}else if(player.x == 400 && $('div.first').position().left < 0){
			   			$('.tile').css('left', '+=5px');
			   			game.collide(player);
			   			if(game.collision && player.status != 'climbing'){
			   				$('.tile').css('left', '-=5px');
			   				player.status = 'walk';
			   			}
			   		}else{
			   			player.x -= 10;
			   			if(player.x > 0){
			   				game.collide(player);
			   				if(!game.collision && player.status != 'climbing'){
			   					player.div.css('left', player.x + 'px');
			   					player.status = 'walk';
			   				}
			   			}
			   		}
					
				}
				break;
				//ruch w prawo
				case 'right':{
					setInterval(player.animate('right'), 30);
			   		if(player.x == 400 && $('div.last').position().left > 720){
			   			$('.tile').css('left', '-=5px');
			   			game.collide(player);
			   			if(game.collision && player.status != 'climbing' ){
			   				$('.tile').css('left', '+=5px');
			   				player.status = 'walk';
			   			}
					}else{
						player.x += 10;
						if(player.x < 720){
							game.collide(player);
							if(!game.collision && player.status != 'climbing'){
								player.div.css('left', player.x + 'px');
								player.status = 'walk';
							}
						}
					}
				}
				break;
				//wspinanie się
				case 'climb':{
					player.y -= 10;
					game.collide(player);
					console.log(player.status);
					if(game.climb){
						player.div.css('top', player.y + 'px');
						player.status = 'climbing';
					}else{
						player.status = 'stand';
					}
				}
				break;
				//schodzenie w dół
				case 'down':{
					player.y += 10;
					game.collide(player);
					if(!game.collision){
						if(game.climb){
							player.div.css('top', player.y + 'px');
							player.status = 'climbing';
						}
					}else{
						player.status = 'stand';
					}
				}
				break;
				//spadanie
				case 'fall':{
					console.log('falling');
				}
				break;
			};
		},
		loot: function(diamond){
			$(diamond).remove();
			game.points += 1;
			$('#points').text(game.points);
		},
		die: function(){
			player.div.fadeOut('slow');
		},
		animate: function(direction){
			switch(direction){
				case 'left': {
					for(i = 0; i < 3; i++){
						console.log(i);
						player.div.css('background-position', '-' + i * 50 + 'px 0px');
					}
				}
				break;
				case 'right': {
					for(i = 0; i < 3; i++){
						player.div.css('background-position', '-' + i * 50 + 'px -20px');
					}
				}
				break;
			}
		}
	};
	$('#board').append(player.div);

	//wczytywanie mapy kafelków
	var level = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,0,4,0,0,0,0,0,0,3,0,0,0,0,0,0,3,0,0,0,0],
				 [0,6,0,0,5,3,3,3,0,0,0,0,0,0,0,0,3,0,3,3,0,3,0,3,0,0],
				 [0,6,2,2,4,0,0,0,2,0,0,0,2,0,0,0,0,4,0,0,2,0,0,0,4,2],
				 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1]];

	$.each(level, function(i, e){
		$.each(e, function(j, tiles){
			if(tiles > 0){
				var tile = $('<div class="tile"></div>');
				$('#board').append(tile);
				tile.css("top", i * sprite.height);
				tile.css("left", j * sprite.width);
				if(tiles == 1){
					tile.addClass('ground');
				}
				if(tiles == 2){
					tile.addClass('spikes');
				}
				if(tiles == 4){
					tile.addClass('diamonds');
				}
				if(tiles == 5){
					tile.addClass('platform');
					tile.attr('id', 'platform1');
				}
				if(tiles == 6){
					tile.addClass('ladder');
				}
			}
		});
	});
	$('#board').find('.tile.ground').first().addClass('first');
	$('#board').find('.tile.ground').last().addClass('last');


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
	   		player.move('climb');
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
	   		player.status = 'stand';
	   	}

	   	//akutalizuje stan i pozycję gracza
	   	player.update();

	 	//poruszające się platformy
	 	$('#board').find('.tile.platform').animate({left: "-=160"}, 5000).animate({left: "+=160"}, 5000);

	 	//postać porusza się wraz z platformą jeśli na niej stoi bezczynnie
	 	if(game.platform == true && game.keyboard[39] == false && game.keyboard[37] == false){
	 		console.log('on platform!');
	 		player.x = $('#board').find('.tile.platform').position().left;
	 		player.div.css('left', player.x + 'px');
	 	}
	}
	setInterval(gameLoop, 30);
	
});
$(function(){
	game = {
		height: 600,
		width: 800,
		keyboard: [],
		points: 0,
		collision: false,
		fall: false,
		inactive: true,
		collide: function(player){
			game.collision = false;
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
					}else{
						game.collision = true;
						console.log('collide!');
						return false;
					}
				}else if((player.x + player.w > tile_x) && (player.x < tile_x + tile_w) && (player.y +  player.h < tile_y)){
					game.fall = true;
					console.log('fall!');
					return false;
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
		move: function(action){
			player.x = player.div.position().left;
	 		player.y = player.div.position().top;
	 		player.h = player.div.height();
	 		player.w = player.div.width();
			switch(action){
				//ruch w lewo
				case 'left':{
					if( player.x > 400 && $('div.last').position().left === 720){

						player.x -= 10;
						game.collide(player);
						if(!game.collision){
							player.div.css('left', player.x + 'px');
						}
			   		}else if(player.x == 400 && $('div.first').position().left < 0){
			   			$('.tile').css('left', '+=20px');
			   			game.collide(player);
			   			if(game.collision){
			   				$('.tile').css('left', '-=20px');
			   			}
			   		}else{
			   			player.x -= 10;
			   			if(player.x > 0){
			   				game.collide(player);
			   				if(!game.collision){
			   					player.div.css('left', player.x + 'px');
			   				}
			   			}
			   		}
					
				}
				break;
				//ruch w prawo
				case 'right':{
			   		if(player.x == 400 && $('div.last').position().left > 720){
			   			$('.tile').css('left', '-=20px');
			   			game.collide(player);
			   			if(game.collision){
			   				$('.tile').css('left', '+=20px');
			   			}
					}else{
						player.x += 10;
						if(player.x < 720){
							game.collide(player);
							if(!game.collision){
								player.div.css('left', player.x + 'px');
							}
						}
					}
				}
				break;
				//skok
				case 'jump':{
					player.div.animate().stop();
					player.y -= 180;
					game.collide(player);
					if(!game.collision){
						player.div.animate({top: player.y});
						if(game.fall){
							player.move('fall');
						}
					}
				}
				break;
				//spadanie
				case 'fall':{
					console.log('falling');
					player.div.animate({top: player.y});
					game.collide(player);
					if(!game.collision){
						player.y -= 180;
					}
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
		}
	};
	$('#board').append(player.div);

	//wczytywanie mapy kafelków
	var level = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,3,4,0,0,0,0,0,0,3,0,0,0,0,0,0,3,0,0,0,0],
				 [0,0,0,0,0,3,3,3,0,0,0,0,0,0,0,0,3,0,3,3,0,3,0,3,0,0],
				 [0,0,2,2,4,0,0,0,2,0,0,0,2,0,0,0,0,4,0,0,2,0,0,0,4,2],
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
		if(game.keyboard[37]) { 
	   		player.move('left');
	   		game.inactive = false;
	 	}
	 	//strzałka w prawo
	 	if(game.keyboard[39]) { 
	   		player.move('right');
	   		game.inactive = false;
	 	}
	 	//strzałka w górę
	 	if(game.keyboard[38]) { 
	   		player.move('jump');
	   		game.inactive = false;
	   	}
	 	
	 	if(game.inactive){
	 		player.move('inactive');
	 	}
	}

	setInterval(gameLoop, 30);
	
});
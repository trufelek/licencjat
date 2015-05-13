$(function(){
	game = {
		height: 600,
		width: 800,
		keyboard: [],
		points: 0,
		collide: function(player){
			var collision = false;
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
						player.die();
					}else{
						collision = true;
						console.log('collide!');
					}
				}else if((player.x + player.w > tile_x) && (player.x < tile_x + tile_w) && (player.x + 0.5 * player.w > tile_x) && (player.y + player.h == tile_y)){
					if($(tile).hasClass('spikes')){
						player.div.animate({left: '+=40', top: '+=80'}, 1000);
						player.die();
					}else{
						// player.move('fall');
						// player.die();
					}
				}
				
				
			});
			return collision;
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
						var collision = game.collide(player);
						if(!collision){
							player.div.css('left', player.x + 'px');
						}
			   		}else if(player.x == 400 && $('div.first').position().left < 0){
			   			$('.tile').css('left', '+=40px');
			   			var collision = game.collide(player);
			   			if(collision){
			   				$('.tile').css('left', '-=40px');
			   			}
			   		}else{
			   			player.x -= 10;
			   			if(player.x > 0){
			   				game.collide(player);
			   				if(!collision){
			   					player.div.css('left', player.x + 'px');
			   				}
			   			}
			   		}
					
				}
				break;
				//ruch w prawo
				case 'right':{
			   		if(player.x == 400 && $('div.last').position().left > 720){
			   			$('.tile').css('left', '-=40px');
			   			var collision =  game.collide(player);
			   			if(collision){
			   				$('.tile').css('left', '+=40px');
			   			}
					}else{
						player.x += 10;
						if(player.x < 720){
							var collision =  game.collide(player);
							if(!collision){
								player.div.css('left', player.x + 'px');
							}
						}
					}
				}
				break;
				//skok
				case 'jump':{
					player.y -= 80;
					var collision = game.collide(player);
					if(!collision){
						player.div.css('top', player.y + 'px');	
					}
				}
				break;
				//spadanie
				case 'fall':{
					player.y += 80;
					var collision = game.collide(player);
					if(!collision){
						player.div.css('top', player.y + 'px');
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
				 [0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,4,0],
				 [1,1,2,2,1,1,1,1,2,1,1,1,2,2,1,1,1,1,1,1,2,2,2,2,1,1]];

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
	

	// funckja obsługi stanu klawiatury
	 $(document).keydown(function(e){

	//strzałka w lewo
	 	if(game.keyboard[37]) { 
	   		player.move('left');
	   		//console.log(player.x);
	 	}
	 	//strzałka w prawo
	 	if(game.keyboard[39]) { 
	   		player.move('right');
	   		//console.log(player.x);
	 	}
	 	//strzałka w górę
	 	if(game.keyboard[38]) { 
	   		player.move('jump');
	   	}
	 	//strzałka w dół
	 	if(game.keyboard[40]) { 
	 		player.move('fall');
	 	}
	});
	
});
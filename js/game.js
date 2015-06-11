game = {
	height: 600,
	width: 800,
	keyboard: [],
	points: 0,
	collisions: [],
	fall: false,
	climb: false,
	platform: false,
	init: function(){
		//tworzy plansze
		$('body').height(window.innerHeight - 50);
		$('#game').append('<div id="board"></div>');
		$('#game').append('<div id="score">Punkty: <span id="points">0</span></div>');
		$('#board').append('<div class="background"></div>');

		//rysuje mape kafelków
		board.draw();

		//dodaje bohatera
		$('#board').append(player.div);
	},
	intersect: function(a1,a2,b1,b2){
  		var i1 = Math.min(Math.max(a1, b1), a2);
    	var i2 = Math.max(Math.min(a2, b2), a1);
    	return [i1, i2];
	}, 
	collide: function(player_x, player_y, player_w, player_h){
		game.collisions = [];
		$('.tile').each(function(i, tile){
			var tile_x = $(tile).position().left;
			var tile_y = $(tile).position().top;
			var tile_w = $(tile).width();
			var tile_h = $(tile).height();

			if((player_x + player_w > tile_x) && (player_x < tile_x + tile_w) && (player_y + player_h > tile_y) && (player_y < tile_y + tile_h)){
				game.collisions.push(tile);
			}


			/*
			if((player_x + player_w > tile_x) && (player_x < tile_x + tile_w) && (player_y + player_h > tile_y) && (player_y < tile_y + tile_h)){
				if($(tile).hasClass('diamonds')){
					console.log('diamond!');
					player.loot(tile);
				}else if($(tile).hasClass('spikes')){
					console.log('spikes!');
				}else if($(tile).hasClass('ladder')){
					game.climb = true;
				}else{
					game.collisions.push(tile);
					console.log('collide!');
					console.log(tile);
					return game.collisions;
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
			*/
			
		});
	return game.collisions;	
	}
};
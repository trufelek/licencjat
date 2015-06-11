game = {
	height: 600,
	width: 800,
	keyboard: [],
	points: 0,
	collisions: [],
	fall: false,
	climb: false,
	platform: false,
	//funkcja inicjująca
	init: function(){
		$('body').height(window.innerHeight - 50);
		$('#game').append('<div id="board"></div>');
		$('#game').append('<div id="score">Punkty: <span id="points">0</span></div>');
		$('#game').append('<div id="lives"><span id="hearts" class="three"></span></div>');
		$('#board').append('<div class="background"></div>');

		//rysuje mape kafelków
		board.draw();

		//dodaje bohatera
		$('#board').append(player.div);
	},
	//funkcja znajduje część wspólną
	intersect: function(x1,x2,y1,y2){
  		var i1 = Math.min(Math.max(x1, y1), x2);
    	var i2 = Math.max(Math.min(x2, y2), x1);
    	return [i1, i2];
	}, 
	//detekcja kolizji
	collide: function(player_x, player_y, player_w, player_h){
		game.collisions = [];
		$('.tile').each(function(i, tile){
			var tile_x = $(tile).position().left;
			var tile_y = $(tile).position().top;
			var tile_w = $(tile).width();
			var tile_h = $(tile).height();

			if((player_x + player_w > tile_x) && (player_x < tile_x + tile_w) && (player_y + player_h > tile_y) && (player_y < tile_y + tile_h)){
				if($(tile).hasClass('diamonds')){
					console.log('diamond!');
					player.loot(tile);
				}else if($(tile).hasClass('heart')){
					console.log(player.lives);
					if(player.lives < 3){
						player.heal(tile);
					}
				}else if($(tile).hasClass('spikes')){
					console.log('spikes!');
					player.status = "dead";
				}else{
					game.collisions.push(tile);
				}
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
			}
			*/
			
		});
	return game.collisions;	
	}
};
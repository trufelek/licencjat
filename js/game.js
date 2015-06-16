game = {
	height: 600,
	width: 800,
	keyboard: [],
	points: 0,
	collisions: [],
	level: 'level1',
	//funkcja inicjująca
	init: function(level, points, lives){
		//ustawia poziom gry
		if(level == 'level1'){
			game.level = 'level1';
		}else if (level == 'level2'){
			game.level = 'level2';
		}else if(level == 'level3'){
			game.level = 'level3';
		}
		
		game.points = points;

		//rysuje mape kafelków
		board.draw(level, function(){
			$('#points').text(game.points);

			if(lives == 2){
				$('#hearts').removeClass();
				$('#hearts').addClass('two');
			}else if(lives == 1){
				$('#hearts').removeClass();
				$('#hearts').addClass('one');
			}
		});
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
					player.loot(tile);
				}else if($(tile).hasClass('heart')){
					if(player.lives < 3){
						player.heal(tile);
					}
				}else if($(tile).hasClass('spikes')){
					player.status = "dead";
				}else if($(tile).hasClass('love')){
					player.status = "win";
				}else{
					game.collisions.push(tile);
				}
			}	
		});
	return game.collisions;	
	},
	animate: function(){
		var animation = player.status;
		switch(animation){
			case 'stand' : {
				if(player.flip == true){
					player.div.css('background-position', '0px -80px');
				}else{
					player.div.css('background-position', '0px 0px');
				}
			}
			break;
			case 'walk' :{
				for(i=0; i < player.frames; i++){
					if(player.flip == true){
						player.div.css('background-position', '-' + player.frame * 80 + 'px -80px');
					}else{
						player.div.css('background-position', '-' + player.frame * 80 + 'px 0px');
					}
					player.frame ++;
					if(player.frame > player.frames){
						player.frame = (player.frame + 1) % player.frames;
					}
				}
			}
			break;
			case 'jump':{
				if(player.flip == true){
					player.div.css('background-position', '0px -80px');
				}else{
					player.div.css('background-position', '0px 0px');
				}
			}
			break;
		}
	}
};
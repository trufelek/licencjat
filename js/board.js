board = {
	level1 : [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			 [0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			 [0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,4,0,0,0,0,3,0,0,0,0],
			 [0,0,0,0,0,0,0,3,3,3,0,0,0,0,0,3,3,0,3,3,0,0,0,3,0,0],
			 [0,0,2,0,0,4,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,7,2],
			 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1]],
	level2 : [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			 [0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			 [0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,4,0,0,0,0,3,0,0,0,0],
			 [0,0,0,0,0,0,0,3,3,3,0,0,0,0,0,3,3,0,3,3,0,0,0,3,0,0],
			 [0,0,2,2,2,4,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,7,2],
			 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1]],
	draw: function(level, callback){
		switch(level){
			case 'level1': {
				var level = board.level1;
			}
			break;
			case 'level2': {
				var level = board.level2;
			}
			break;
		}
		$.each(level, function(i, e){
			$.each(e, function(j, tiles){
				if(tiles > 0){
					var tile = $('<div class="tile"></div>');
					$('#board').append(tile);
					tile.css("top", i * 80);
					tile.css("left", j * 80);
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
					if(tiles == 7){
						tile.addClass('heart');
					}
				}
			});
		});

		$('#board').find('.tile.ground').first().addClass('first');
		$('#board').find('.tile.ground').last().addClass('last');

		//dodaje bohatera
		$('#board').append(player.div);
		$('#player').css('top', 460 + 'px').css('left', 0 + 'px');
	}
}

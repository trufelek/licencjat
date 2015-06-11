board = {
	level : [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			 [0,0,0,0,0,0,0,4,0,0,0,0,0,0,3,0,0,0,0,0,0,3,0,0,0,0],
			 [0,0,0,0,0,3,3,3,0,0,0,0,0,0,0,0,3,0,3,3,0,3,0,3,0,0],
			 [0,0,2,2,4,0,0,0,2,0,0,0,2,0,0,0,0,4,0,0,2,0,0,0,4,2],
			 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1]],
	draw: function(){
		$.each(board.level, function(i, e){
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
				}
			});
		});

		$('#board').find('.tile.ground').first().addClass('first');
		$('#board').find('.tile.ground').last().addClass('last');
	}
}

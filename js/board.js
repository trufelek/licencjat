board = {
	level1 : [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			 [0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0],
			 [0,0,0,0,0,0,0,0,3,0,0,3,0,0,0,0,3,0,0,0,0,3,0,0,0,0],
			 [0,0,0,3,3,0,0,3,3,3,0,0,0,3,3,0,0,0,3,3,0,0,0,3,0,0],
			 [0,0,0,0,0,2,2,0,0,0,0,2,0,0,0,2,2,2,0,0,0,7,0,0,0,4],
			 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]],

	level2 : [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			 [0,0,4,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			 [0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0],
			 [3,0,0,0,3,0,0,0,3,0,3,0,0,3,0,0,0,3,0,0,0,0,0,0,0,0],
			 [3,2,2,2,3,2,2,2,3,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0],
			 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]],
	draw: function(level, callback){
		$('body').html('');
		$('body').height(window.innerHeight - 50);
		$('body').append("<div id='game'></div>");
		$('#game').append('<div id="board"></div>');
		$('#game').append('<div id="score">Punkty: <span id="points">0</span></div>');
		$('#game').append('<div id="lives"><span id="hearts" class="three"></span></div>');
		$('#board').append('<div class="background back"></div>');
		$('#board').append('<div class="background front"></div>');

		switch(level){
			case 'level1': {
				var level = board.level1;
				$(".background").addClass('level1');

			}
			break;
			case 'level2': {
				var level = board.level2;
				$(".background").addClass('level2');
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
					if(tiles == 6){
						tile.addClass('ladder');
					}
					if(tiles == 7){
						tile.addClass('heart');
					}
				}
			});
		});

		if(game.level == 'level1'){
			$(".tile").addClass('level1');
		}else if(game.level == 'level2'){
			$(".tile").addClass('level2');		
		}

		$('#board').find('.tile.ground').first().addClass('first');
		$('#board').find('.tile.ground').last().addClass('last');


		//dodaje bohatera
		$('#board').append(player.div);
		$('#player').css('left', 0 + 'px').css('top', 0 + 'px');

		return callback(null);
	}
}
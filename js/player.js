player = {
	div: $('<div id="player"></div>'),
	acceleration: 9,
    speed: 20,
    status : "stand",
    motion : 0,
    delta: 30,
    lives: 3,
	update: function(){
		if(player.status == "dead"){
			player.die();
			player.status = "stand";
			player.div.css('top', 460 + 'px').css('left', 0 + 'px');
			player.div.fadeOut('slow').fadeIn('slow');
		}else{
			player.speed = Math.min(100,Math.max(-100, player.speed + player.acceleration * player.delta / 100.0)); 
	        var x = player.div.position().left + player.motion;
	        var y = player.div.position().top + player.speed * player.delta / 100.0;
	        var w = player.div.width();
	        var h = player.div.height();   

	        //detekcja kolizji powinna zwrócić kafelki z którymi koliduje postać
	       	var collisions = game.collide(x, y, w, h);
	       	var i = 0;
	        while (i < collisions.length > 0) {
	            var collision = collisions[i];
	            i++;
	            var collisionBox = {
	                x1: $(collision).position().left,
	                y1: $(collision).position().top,
	                x2: $(collision).position().left + $(collision).width(),
	                y2: $(collision).position().top + $(collision).height()
	            };
	            
	            var xx = game.intersect(x, x + w, collisionBox.x1,collisionBox.x2);
	            var yy = game.intersect(y, y + h, collisionBox.y1,collisionBox.y2);
	            
	            var diffx = (xx[0] === x)? xx[0]-xx[1] : xx[1]-xx[0];
	            var diffy = (yy[0] === y)? yy[0]-yy[1] : yy[1]-yy[0];
	            if (Math.abs(diffx) > Math.abs(diffy)){
	                // przesunięcie na osi Y
	                 y -= diffy;
	                 player.speed = 0;
	                 if(player.status =="jump" && diffy > 0){
	                    player.status="stand";
	                    // gf.setAnimation(this.div, playerAnim.stand);
	                 }
	            } else {
	                // przesunięcie na osi X
	                y -= diffx;
	            }
	        }
	      
	      	player.div.css('left', x);
	      	player.div.css('top', y);
	      	player.motion = 0;
		}
	},
	move: function(action){
		switch(action){
			//ruch w lewo
			case 'left':{
				if(player.status != "climbing"){
					if(player.div.position().left > 400 && $('div.first').position().left < 0){
			   			$('.tile').css('left', '+=5px');
			   		}else{
			   			if(player.status == "stand"){
		            		//game.animate(player.div, walk, true);
		            		status = "walk";
		            		player.motion -= 10;
			            }else if(player.status == "jump"){
			            	player.motion -= 5;
			            }else if(player.status == "walk"){
			            	player.motion -= 10;
			            }
			   		}	
		            //game.transform(player.div);
		            player.div.css('background-position', '0px 0px');
				}
			}
			break;
			//ruch w prawo
			case 'right':{
				if(player.status != "climbing"){
					if(player.div.position().left > 400 && $('div.last').position().left > 720){
						$('.tile').css('left', '-=5px');
					}else{
						if(player.status == "stand"){
			            	//game.animate(player.div, walk, true);
			            	status = "walk";
			            	player.motion += 10;
			            }else if(player.status == "jump"){
			            	player.motion += 5;
			            }else if(player.status == "walk"){
			            	player.motion += 10;
			            }
					}
					//game.transform(player.div);
			        player.div.css('background-position', '0px -20px');
				}
			}
			break;
			//skakanie
			case 'jump':{
				if(player.status == "stand" || player.status == "walk"){
					//game.animate(player.div, jump, true);
					player.status = "jump";
					console.log(player.status);
					player.speed = -60;
				}
			}
			break;
			//brak ruchu
			case 'inactive':{
				if(player.status == "walk"){
					//game.animate(player.div, stand, false);
					player.status = "stand";
				}
			}
			break;
			//wspinanie się
			case 'climb':{
				//...
			}
			break;
			//schodzenie w dół
			case 'down':{
				//...
			}
			break;
		};
	},
	loot: function(diamond){
		$(diamond).remove();
		game.points += 1;
		$('#points').text(game.points);
	},
	heal: function(heart){
		$(heart).remove();
		player.lives ++;

		if(player.lives == 3){
			$('#hearts').removeClass();
			$('#hearts').addClass('three');
		}else if(player.lives == 2){
			$('#hearts').removeClass();
			$('#hearts').addClass('two');
		}
	},
	die: function(){
		player.lives --;
		if(player.lives == 2){
			$('#hearts').removeClass();
			$('#hearts').addClass('two');
		}else if(player.lives == 1){
			$('#hearts').removeClass();
			$('#hearts').addClass('one');
		}else{
			console.log('game over');
		}
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
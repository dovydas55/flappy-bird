window.Player = (function() {
	'use strict';

	//var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.

	var GRAVITY = 170;
	var JUMP = 45;
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 51;
	var INITIAL_POSITION_Y = 25;
	var INITIAL_POSITION_X_MOBILE = 16;
	var INITIAL_POSITION_Y_MOBILE = 24;
	var notInitialState = false;
	var afterRestart = false;

	var Player = function(el, game, pipa) {
		var self  = this;
		this.pipe = pipa;
		this.radius = 4.5; /*pig radius*/

		this.enableDeath = true;
		this.el = el;
		this.flapSound = document.getElementById("flapSound");
		this.dieSound = document.getElementById("dieSound");
		this.pointSound = document.getElementById("pointSound");
		this.backgroundMusic = document.getElementById("backGround2");

		this.MUTE = false;
		this.jump = true;
		this.velocity = 0;
		this.game = game;
		this.pos = {
			x: 0,
			y: 0,
		};

		/*this.mute = document.getElementById('test');
		this.mute.addEventListener("click", this.tmp, false);*/


		$(window).bind('keydown',function(e){

			if(e.keyCode === 32 && self.jump){
				self.game.START_PIPES = true;

				if(!notInitialState){
					self.el.addClass('PlayerBackground-flap');
				}
				notInitialState = true;
				self.flap();
				self.jump = false;
			}
		});

		$(window).bind('keyup',function(){
			self.jump = true;
		});

		$(window).bind('mousedown', function(){
			/*if(self.mute){

				console.log("i mute");

			}*/

			if(self.jump){
				/*if(this.velocity > 0){
					self.el.addClass('Player-flap-up');
				}*/
				if(!notInitialState){
					self.el.addClass('PlayerBackground-flap');
				}
				notInitialState = true;
				self.game.START_PIPES = true;
				if(afterRestart){
					self.game.START_PIPES = false;
					notInitialState = false;
				}
				self.flap();
				self.jump = false;
			}
		});

		$(window).bind('mouseup', function(){
			self.jump = true;
			afterRestart = false;
		});


		$(window).bind('touchstart', function(){
			if(self.jump){

				if(!notInitialState){
					self.el.addClass('PlayerBackground-flap');
				}
				notInitialState = true;
				self.game.START_PIPES = true;

				if(afterRestart){
					self.game.START_PIPES = false;
					notInitialState = false;
				}
				self.flap();
				self.jump = false;
			}
		});

		$(window).bind('touchend', function(){
			self.jump = true;
			afterRestart = false;
		});

		$(".mute").click(function(){

			console.log("should mute!!");
			if(self.MUTE === true){
				self.muteAllSounds();
				self.MUTE = false;
			} else {
				self.playAllSounds();
				self.MUTE = true;
			}
		});

	};

	/**
	 * Resets the state of the player for a new game.
	 */

	/*Player.prototype.tmp = function(bla) {
		console.log(bla);
	};*/

	Player.prototype.reset = function() {
		if(window.innerWidth < 500){
			this.pos.x = INITIAL_POSITION_X_MOBILE;
			this.pos.y = INITIAL_POSITION_Y_MOBILE;
		}
		else {
			this.pos.x = INITIAL_POSITION_X;
			this.pos.y = INITIAL_POSITION_Y;
		}
		this.initVolume();

	};

	Player.prototype.flap = function() {
		this.velocity = JUMP;
		if (!afterRestart){
			this.flapSound.play();
		}

	};

	Player.prototype.onFrame = function(delta) {
		if(this.game.START_PIPES){
				this.enableDeath = true;
		}
		if(notInitialState){
			this.pos.y -= this.velocity * delta;
			this.velocity -= GRAVITY * delta;
		}

		this.checkCollisionWithBounds();
		this.checkCollisionWithPipe();
		// Update UI
		//this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
		//console.log(this.velocity);

		if(this.velocity > 10){

			this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em) rotateZ(-10deg)');
		}
		else if(this.velocity > 0 ){

			this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em) rotateZ(-10deg)');

		}
		else if(this.velocity < -75){

			this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em) rotateZ(70deg)');

		}
		else if(this.velocity < -70){

			this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em) rotateZ(50deg)');

		}
		/*else if(this.velocity < -20){

			this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em) rotateZ(-10deg)');

		}

		else if(this.velocity < 0){

			this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em) rotateZ(35deg)');

		}*/

		else{
			this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
		}

	};

	Player.prototype.checkCollisionWithPipe = function(){
		if(this.enableDeath){
				if(this.pipe.PipeLocation.PipeSet1.PipeUP.x <= -40 && this.pipe.PipeLocation.PipeSet1.PipeUP.x >= -50){
					if(this.pos.y >= this.pipe.PipeLocation.PipeSet1.PipeUP.y || this.pos.y <= this.pipe.PipeLocation.PipeSet1.PipeDown.y ||
					this.hitbox(Math.abs(this.pipe.PipeLocation.PipeSet1.PipeUP.x), this.pipe.PipeLocation.PipeSet1.PipeUP.y) ||
					this.hitbox(Math.abs(this.pipe.PipeLocation.PipeSet1.PipeDown.x), this.pipe.PipeLocation.PipeSet1.PipeDown.y) ){
						this.pipe.PipeLocation.PipeSet1.PipeUP.x = null;
						this.pipe.PipeLocation.PipeSet1.PipeDown.x = null;
						this.die();

						this.pos.y = this.game.WORLD_HEIGHT - HEIGHT ;
					}
				} else if(this.pipe.PipeLocation.PipeSet1.PipeUP.x <= -50 && this.pipe.PipeLocation.PipeSet1.PipeUP.x >= -50.2){
					this.score();
				} else if (this.pipe.PipeLocation.PipeSet2.PipeUP.x <= -40 && this.pipe.PipeLocation.PipeSet2.PipeUP.x >= -50){
					if(this.pos.y >= this.pipe.PipeLocation.PipeSet2.PipeUP.y || this.pos.y <= this.pipe.PipeLocation.PipeSet2.PipeDown.y ||
						this.hitbox(Math.abs(this.pipe.PipeLocation.PipeSet2.PipeUP.x), this.pipe.PipeLocation.PipeSet2.PipeUP.y) ||
						this.hitbox(Math.abs(this.pipe.PipeLocation.PipeSet2.PipeDown.x), this.pipe.PipeLocation.PipeSet2.PipeDown.y) ){

						this.pipe.PipeLocation.PipeSet2.PipeUP.x = null;
						this.pipe.PipeLocation.PipeSet2.PipeDown.x = null;
						this.die();
						this.pos.y = this.game.WORLD_HEIGHT - HEIGHT;
					}
				} else if(this.pipe.PipeLocation.PipeSet2.PipeUP.x <= -50 && this.pipe.PipeLocation.PipeSet2.PipeUP.x >= -50.2){
					this.score();
				} else if (this.pipe.PipeLocation.PipeSet3.PipeUP.x <= -40 && this.pipe.PipeLocation.PipeSet3.PipeUP.x >= -50){
					if(this.pos.y >= this.pipe.PipeLocation.PipeSet3.PipeUP.y || this.pos.y <= this.pipe.PipeLocation.PipeSet3.PipeDown.y ||
						this.hitbox(Math.abs(this.pipe.PipeLocation.PipeSet3.PipeUP.x), this.pipe.PipeLocation.PipeSet3.PipeUP.y) ||
						this.hitbox(Math.abs(this.pipe.PipeLocation.PipeSet3.PipeDown.x), this.pipe.PipeLocation.PipeSet3.PipeDown.y) ){

						this.pipe.PipeLocation.PipeSet3.PipeUP.x = null;
						this.pipe.PipeLocation.PipeSet3.PipeDown.x = null;

						this.die();
						this.pos.y = this.game.WORLD_HEIGHT - HEIGHT;

					}
				} else if(this.pipe.PipeLocation.PipeSet3.PipeUP.x <= -50 && this.pipe.PipeLocation.PipeSet3.PipeUP.x >= -50.2){
					this.score();
				}

	}

	};

	Player.prototype.score = function(){
		this.pointSound.play();
		this.game.incr = true;
		this.game.SCORE += 1;
	};

	Player.prototype.die = function(){
		this.enableDeath = false;
		afterRestart = true;
		notInitialState = false;
		this.dieSound.play();
		this.velocity = 0;

		return this.game.gameover();
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
			/* TODO: disable wing sound */
			this.die();
			this.pos.y = this.game.WORLD_HEIGHT - HEIGHT;
		}



	};

	Player.prototype.muteAllSounds = function(){
		this.flapSound.muted = true;
		this.dieSound.muted = true;
		this.pointSound.muted = true;
		this.backgroundMusic.muted = true;
	};

	Player.prototype.playAllSounds = function(){
		this.flapSound.muted = false;
		this.dieSound.muted = false;
		this.pointSound.muted = false;
		this.backgroundMusic.muted = false;
	};

	Player.prototype.initVolume = function(){
		this.flapSound.volume  = 0.2;
		this.dieSound.volume  = 0.2;
		this.pointSound.volume  = 0.2;
		this.backgroundMusic.volume  = 0.4;
	};

	Player.prototype.hitbox = function(x, y){
		var dist = Math.sqrt( Math.pow(Math.abs(this.pos.x - x), 2) + Math.pow(Math.abs(this.pos.y - y), 2) );

		//console.log(dist);
		//console.log(x);
		//console.log(this.pos.x);
		if(dist <= this.radius) {
			return true;
		}
		else return false;
	};

	return Player;

})();

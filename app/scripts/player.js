window.Player = (function() {
	'use strict';

	//var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30; // * 10 pixels per second
	var GRAVITY = 0.05;
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

		this.el = el;
		this.flapSound = document.getElementById("flapSound");
		this.dieSound = document.getElementById("dieSound");
		this.pointSound = document.getElementById("pointSound");
		this.jump = true;
		this.velocity = 0.5;
		this.game = game;
		this.pos = {
			x: 0,
			y: 0,
		};

		$(window).bind('keydown',function(e){
			if(e.keyCode === 32 && self.jump){
				self.el.addClass('Player-flap');
				notInitialState = true;
				self.flap();
				self.jump = false;
			}
		});

		$(window).bind('keyup',function(){
			self.jump = true;
		});

		$(window).bind('mousedown', function(){
			if(self.jump){
				self.el.addClass('Player-flap');
				notInitialState = true;
				if(afterRestart){
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

				notInitialState = true;
				if(afterRestart){
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

	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		if(window.innerWidth < 500){
			this.pos.x = INITIAL_POSITION_X_MOBILE;
			this.pos.y = INITIAL_POSITION_Y_MOBILE;
		}
		else {
			this.pos.x = INITIAL_POSITION_X;
			this.pos.y = INITIAL_POSITION_Y;
		}

	};

	Player.prototype.flap = function() {
		this.velocity -= 1.5;
		if(!afterRestart){
			this.flapSound.load();
			this.flapSound.play();

		}
	};

	Player.prototype.onFrame = function(delta) {

		if(notInitialState){
			this.velocity += GRAVITY;
			//console.log("velocity in in frame after : " + this.velocity);
			this.pos.y += this.velocity;
			//this.pos.y += 0.98;
		}

		this.checkCollisionWithBounds();
		this.checkCollisionWithPipe();
		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Player.prototype.checkCollisionWithPipe = function(){
		var didNotDie = false;

		/*TODO: check if he hits the pipe! */
		if(this.pipe.PipeLocation.PipeSet1.PipeUP.x <= -43 && this.pipe.PipeLocation.PipeSet1.PipeUP.x >= -47){
			//console.log("-pipe 1-");
			//console.log("PIG  " + this.pos.y + "   PIPE  " + this.pipe.PipeLocation.PipeSet1.PipeUP.y);

			didNotDie = true;
		} else if (this.pipe.PipeLocation.PipeSet2.PipeUP.x <= -43 && this.pipe.PipeLocation.PipeSet2.PipeUP.x >= -47){
			//console.log("-pipe 2-");

			didNotDie = true;
		} else if (this.pipe.PipeLocation.PipeSet3.PipeUP.x <= -43 && this.pipe.PipeLocation.PipeSet3.PipeUP.x >= -47){
			//console.log("-pipe 3-");

			didNotDie = true;
		}

		if(didNotDie){
			this.pointSound.play();
		}

	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			/*this.pos.y < 0 ||*/
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
			notInitialState = false;
			afterRestart = true;

			this.dieSound.play();

			/* TODO: disable wing sound */

			return this.game.gameover();

		}
		else if(this.pos.y < -3){
				//console.log("in - boundries");
			   this.pos.y = -3.05;
				 this.pos.y += 0.05;
		}

	};

	return Player;

})();

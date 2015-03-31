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
	var notInitialState = false;

	var Player = function(el, game) {
		var self  = this;
		this.el = el;
		this.flapSound = document.getElementById("flapSound");
		this.jump = true;
		this.velocity = GRAVITY;
		this.game = game;
		this.pos = {
			x: 0,
			y: 0,
		};

		$(window).bind('keydown',function(e){
			if(e.keyCode === 32 && self.jump){
				notInitialState = true;
				self.el.addClass('Player-flap');
				self.flap();
				self.jump = false;
			}
		});

		$(window).bind('keyup',function(){
			self.jump = true;
		});

		$(window).bind('mousedown', function(){
			if(self.jump){
				notInitialState = true;
				self.flap();
				self.jump = false;
			}
		});

		$(window).bind('mouseup', function(){
			self.jump = true;
		});


		$(window).bind('touchstart', function(){
			if(self.jump){
				notInitialState = true;
				self.flap();
				self.jump = false;
			}
		});

		$(window).bind('touchend', function(){
			self.jump = true;
		});

	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	Player.prototype.flap = function() {
		console.log('flap');
		this.velocity -= 2.1;
		this.flapSound.load();
		this.flapSound.play();
	};

	Player.prototype.onFrame = function(delta) {

		/*if(Controls.keys.space || Controls.keys.mouse === 0) {

			notInitialState = true;
			console.log(Controls.flag);
			Controls.flag = false;

			if(!Controls.keys[space]){
				this.pos.y -= delta * SPEED * 6;
				this.el.css('transform', 'translateZ(0) translate(' + this.pos.y + 'em)');
				Controls.flag = true;
			}
		}*/

		if(notInitialState){
			console.log('on frame');
			this.velocity += GRAVITY;
			this.pos.y += this.velocity - delta;
			//this.pos.y += 0.98;
		}

		/*if (Controls.keys.right) {
			this.pos.x += delta * SPEED;
		}
		if (Controls.keys.left) {
			this.pos.x -= delta * SPEED;
		}*/
		/*if (Controls.keys.down) {
			this.pos.y += delta * SPEED;
		}
		if (Controls.keys.up) {
			this.pos.y -= delta * SPEED;
		}*/

		this.checkCollisionWithBounds();

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			/*this.pos.y < 0 ||*/
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
			notInitialState = false;
			return this.game.gameover();

		}
		else if(this.pos.y < -3){
			   this.pos.y = -3.98;
				 this.pos.y += 0.98;
		}

	};

	return Player;

})();

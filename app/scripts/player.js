window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 51;
	var INITIAL_POSITION_Y = 25;
	var notInitialState = false;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = {
			x: 0,
			y: 0,
		};
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	Player.prototype.onFrame = function(delta) {

		if(Controls.keys.space || Controls.keys.mouse === 0) {

			notInitialState = true;
			console.log(Controls.flag);
			Controls.flag = false;

			if(!Controls.flag){
				this.pos.y -= delta * SPEED * 4;
				this.el.css('transform', 'translateZ(0) translate(' + this.pos.y + 'em)');
				Controls.flag = true;
			}
		}

		if(notInitialState){
			this.pos.y += 0.98;
		}


		/*if (Controls.keys.right) {
			this.pos.x += delta * SPEED;
		}
		if (Controls.keys.left) {
			this.pos.x -= delta * SPEED;
		}*/
		if (Controls.keys.down) {
			this.pos.y += delta * SPEED;
		}
		if (Controls.keys.up) {
			this.pos.y -= delta * SPEED;
		}

		this.checkCollisionWithBounds();

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			/*this.pos.y < 0 ||*/
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
			return this.game.gameover();
		}
		else if(this.pos.y < -3){
			   this.pos.y = -3.98;
				 this.pos.y += 0.98;
		}

	};

	return Player;

})();

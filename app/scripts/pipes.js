
window.Pipes = (function() {
	'use strict';
	var INITIAL_POSITION_X1 = 50;
	var INITIAL_POSITION_Y1 = 35;
	var INITIAL_POSITION_X2 = 50;
	var INITIAL_POSITION_Y2 = -35;

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Pipes = function(el1, el2, game) {
		this.el1 = el1;
		this.el2 = el2;
		this.game = game;
		this.pos1 = {
			x1: INITIAL_POSITION_X1,
			y1: INITIAL_POSITION_Y1
		};
		this.pos2 = {
			x2: INITIAL_POSITION_X2,
			y2: INITIAL_POSITION_Y2
		};

	};

	Pipes.prototype.onFrame = function(delta) {
			console.log(this.pos1.x1);

			this.pos1.x1 -= 0.3;
			this.pos1.y1 = INITIAL_POSITION_Y1;
			this.pos2.x2 -= 0.3;
			this.pos2.y2 = INITIAL_POSITION_Y2;

			if(this.pos1.x1 <= -110) {
					this.pos1.x1 = INITIAL_POSITION_X1;
					this.pos2.x2 = INITIAL_POSITION_X2;
			}

			this.el1.css('transform', 'translateZ(0) translate(' + this.pos1.x1 + 'em, ' + this.pos1.y1 + 'em)');
			this.el2.css('transform', 'translateZ(0) translate(' + this.pos2.x2 + 'em, ' + this.pos2.y2 + 'em)');
	};

	Pipes.prototype.reset = function() {
			this.pos1.x1 = INITIAL_POSITION_X1;
			this.pos1.y1 = INITIAL_POSITION_Y1;
			this.pos2.x2 = INITIAL_POSITION_X2;
			this.pos2.y2 = INITIAL_POSITION_Y2;
	};

	/**
	 * Some shared constants.
	 */
	Pipes.prototype.WORLD_WIDTH = 102.4;
	Pipes.prototype.WORLD_HEIGHT = 57.6;

	return Pipes;
})();

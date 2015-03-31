
window.Pipes = (function() {
	'use strict';

  var pipesList = [];
	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Pipes = function(el) {
		this.el = el;
    var pipe;
		pipe = new window.Pipes(this.el.find('.PipeUp'), this.el.find('.PipeDown'));
		pipesList.push(pipe);
	};

	/**
	 * Some shared constants.
	 */
	Pipes.prototype.WORLD_WIDTH = 102.4;
	Pipes.prototype.WORLD_HEIGHT = 57.6;

	return Pipes;
})();

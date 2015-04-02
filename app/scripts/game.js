window.Game = (function() {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {
		var self = this;
		this.el = el;
		this.ground = this.el.find('.Ground');
		this.isPlaying = false;
		this.SCORE = 0;
		this.BEST = 0;
		this.incr = true;

		this.START_PIPES = false;

		this.pipes = new window.Pipes(this.el.find('#PipeUp1'), this.el.find('#PipeDown1'), this.el.find('#PipeUp2'), this.el.find('#PipeDown2'), this.el.find('#PipeUp3'), this.el.find('#PipeDown3'), this);
		this.player = new window.Player(this.el.find('.PlayerBackground'), this, this.pipes);

		var fontSize = Math.min(
			window.innerWidth / 102.4,
			window.innerHeight / 57.6
		);

		if(window.innerWidth < 500){
			self.el.addClass('GameCanvas-mobile');
			fontSize = Math.min(
				window.innerWidth / 32,
				window.innerHeight / 48
			);
		}

		el.css('fontSize', fontSize + 'px');
		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function() {
		// Check if the game loop should stop.
		if (!this.isPlaying) {
			return;
		}

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
				delta = now - this.lastFrame;
		this.lastFrame = now;

		// Update game entities.
		this.player.onFrame(delta);
		this.pipes.onFrame(delta);

/*
		if(delta >= 0.02){
			console.log(delta);
		}
*/

		if(this.incr){
			//console.log("incrementing");
			$("#score").html(this.SCORE);
		}
		this.incr = false;


		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
		this.reset();
		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		this.START_PIPES = false;
		this.player.reset();
		this.pipes.reset();
		this.player.el.removeClass('PlayerBackground-dead');
		this.player.el.removeClass('PlayerBackground-flap');
		this.ground.removeClass('Ground-stop');
		this.SCORE = 0;
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {
		if(this.SCORE >= this.BEST){
			this.BEST = this.SCORE;
		}
		console.log("your score is " + this.SCORE);
		console.log("your best is " + this.BEST);

		this.isPlaying = false;
		this.player.el.addClass('PlayerBackground-dead');

		this.ground.addClass('Ground-stop');

		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		$(".Score").html("Your score: " + this.SCORE);
		$(".Best").html("High score: " + this.BEST);
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					that.start();
				});
	};

	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;

	return Game;
})();

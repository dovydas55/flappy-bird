window.Pipes = (function() {
	'use strict';

	var INITIAL_POSITION_X1 = 50;
	//var INITIAL_POSITION_Y1 = (window.innerHeight /102.4) * 10  * 0.65;
	var INITIAL_POSITION_Y1 = 37;
	var INITIAL_POSITION_X2 = 50;
	//var INITIAL_POSITION_Y2 = -1 * (window.innerHeight /102.4) * 10  * 0.65;
	var INITIAL_POSITION_Y2 = -37;
	var pipe1Interval, pipe2Interval, pipe3Interval;

	var Pipes = function(el1, el2, elPipeUp, elPipeDown, elPipeUp2, elPipeDown2, game) {
		this.game = game;
		this.pipeUp1 = el1;
		this.pipeDown1 = el2;

		this.pipeUp2 = elPipeUp;
		this.pipeDown2 = elPipeDown;

		this.pipeUp3 = elPipeUp2;
		this.pipeDown3 = elPipeDown2;

		/*pipe 3*/
		this.pipeUp3.pos = {
			x: INITIAL_POSITION_X1 + 120,
			y: INITIAL_POSITION_Y1
		};

		this.pipeDown3.pos = {
			x: INITIAL_POSITION_X2 + 120,
			y: INITIAL_POSITION_Y2
		};

		/********/
		/*pipe 2*/
		this.pipeUp2.pos = {
			x: INITIAL_POSITION_X1 + 60,
			y: INITIAL_POSITION_Y1
		};

		this.pipeDown2.pos = {
			x: INITIAL_POSITION_X2 + 60,
			y: INITIAL_POSITION_Y2
		};
		/*******/

		this.pipeUp1.pos1 = {
			x1: INITIAL_POSITION_X1,
			y1: INITIAL_POSITION_Y1
		};
		this.pipeDown1.pos2 = {
			x2: INITIAL_POSITION_X2,
			y2: INITIAL_POSITION_Y2
		};

		this.randomPosition = 0;
		this.PipeLocation = {
			PipeSet1: {PipeUP: {x: INITIAL_POSITION_X1, y: INITIAL_POSITION_Y1}, PipeDown: {x: INITIAL_POSITION_X2, y: INITIAL_POSITION_Y2}},
			PipeSet2: {PipeUP: {x: INITIAL_POSITION_X1 + 60, y: INITIAL_POSITION_Y1}, PipeDown: {x: INITIAL_POSITION_X2 + 60, y: INITIAL_POSITION_Y2}},
			PipeSet3: {PipeUP: {x: INITIAL_POSITION_X1 + 120, y: INITIAL_POSITION_Y1}, PipeDown: {x: INITIAL_POSITION_X2 + 120, y: INITIAL_POSITION_Y2}}
		};
	};

	var spawnPipe1 = function(obj){
		//console.log("pipe 1");

		var randomPosition = getRandomHeight();
		obj.pipeUp1.pos1.y1 = INITIAL_POSITION_Y1 + randomPosition;
		obj.pipeDown1.pos2.y2 = INITIAL_POSITION_Y2 + randomPosition;

		obj.recordYCordsSet1();

		obj.pipeUp1.pos1.x1 = INITIAL_POSITION_X1;
		obj.pipeDown1.pos2.x2 = INITIAL_POSITION_X2;
		pipe1Interval = setTimeout(function(){
			spawnPipe2(obj);
		}, 3000);
	};

	var spawnPipe2 = function(obj){
		//console.log("pipe 2");

		var randomPosition = getRandomHeight();
		obj.pipeUp2.pos.y = INITIAL_POSITION_Y1 + randomPosition;
		obj.pipeDown2.pos.y = INITIAL_POSITION_Y2 + randomPosition;

		obj.recordYCordsSet2();

		obj.pipeUp2.pos.x = INITIAL_POSITION_X1;
		obj.pipeDown2.pos.x = INITIAL_POSITION_X2;
		pipe2Interval = setTimeout(function(){
			spawnPipe3(obj);
		}, 3000);
	};

	var spawnPipe3 = function(obj){
		//console.log("pipe 3");

		var randomPosition = getRandomHeight();
		obj.pipeUp3.pos.y = INITIAL_POSITION_Y1 + randomPosition;
		obj.pipeDown3.pos.y = INITIAL_POSITION_Y2 + randomPosition;

		obj.recordYCordsSet3();

		obj.pipeUp3.pos.x = INITIAL_POSITION_X1;
		obj.pipeDown3.pos.x = INITIAL_POSITION_X2;
		pipe3Interval = setTimeout(function(){
			spawnPipe1(obj);
		}, 3000);
	};

	var getRandomHeight = function(){
		return Math.floor(Math.random()*(28)-15);
	};

	Pipes.prototype.lockAllIntervals = function(){
		console.log("--locking all intervals--");
		clearTimeout(pipe1Interval);
		clearTimeout(pipe2Interval);
		clearTimeout(pipe3Interval);
	};

	Pipes.prototype.StartIntervalChain = function(){
		spawnPipe1(this);
	};

	Pipes.prototype.onFrame = function(delta) {
		if(this.game.isPlaying){
			this.updatePipePosition();
			this.recordXCords();
			this.animatePipes();

		} else{
			console.log("lock everything");
			this.lockAllIntervals();
		}
	};

	Pipes.prototype.animatePipes = function(){
		this.pipeUp1.css('transform', 'translateZ(0) translate(' + this.pipeUp1.pos1.x1 + 'em, ' + this.pipeUp1.pos1.y1 + 'em)');
		this.pipeDown1.css('transform', 'translateZ(0) translate(' + this.pipeDown1.pos2.x2 + 'em, ' + this.pipeDown1.pos2.y2 + 'em)');

		this.pipeUp2.css('transform', 'translateZ(0) translate(' + this.pipeUp2.pos.x + 'em, ' + this.pipeUp2.pos.y + 'em)');
		this.pipeDown2.css('transform', 'translateZ(0) translate(' + this.pipeDown2.pos.x + 'em, ' + this.pipeDown2.pos.y + 'em)');

		this.pipeUp3.css('transform', 'translateZ(0) translate(' + this.pipeUp3.pos.x + 'em, ' + this.pipeUp3.pos.y + 'em)');
		this.pipeDown3.css('transform', 'translateZ(0) translate(' + this.pipeDown3.pos.x + 'em, ' + this.pipeDown3.pos.y + 'em)');
	};

	Pipes.prototype.updatePipePosition = function(){
		this.pipeUp1.pos1.x1 -= 0.3;
		this.pipeDown1.pos2.x2 -= 0.3;

		this.pipeUp2.pos.x -= 0.3;
		this.pipeDown2.pos.x -= 0.3;

		this.pipeUp3.pos.x -= 0.3;
		this.pipeDown3.pos.x -= 0.3;
	};

	Pipes.prototype.recordYCordsSet1 = function(){
		/*recording the y coordinates */
		this.PipeLocation.PipeSet1.PipeUP.y = this.pipeUp1.pos1.y1;
		this.PipeLocation.PipeSet1.PipeDown.y = this.pipeDown1.pos2.y2 + 60;
	};

	Pipes.prototype.recordYCordsSet2 = function(){
		this.PipeLocation.PipeSet2.PipeUP.y = this.pipeUp2.pos.y;
		this.PipeLocation.PipeSet2.PipeDown.y = this.pipeDown2.pos.y + 60;
	};

	Pipes.prototype.recordYCordsSet3 = function(){
		this.PipeLocation.PipeSet3.PipeUP.y = this.pipeUp3.pos.y;
		this.PipeLocation.PipeSet3.PipeDown.y = this.pipeDown3.pos.y + 60;
	};




	Pipes.prototype.recordXCords = function(){
		/* recording x coordinates */
		this.PipeLocation.PipeSet1.PipeUP.x = this.pipeUp1.pos1.x1;
		this.PipeLocation.PipeSet1.PipeDown.x = this.pipeDown1.pos2.x2;

		this.PipeLocation.PipeSet2.PipeUP.x = this.pipeUp2.pos.x;
		this.PipeLocation.PipeSet2.PipeDown.x = this.pipeDown2.pos.x;

		this.PipeLocation.PipeSet3.PipeUP.x = this.pipeUp3.pos.x;
		this.PipeLocation.PipeSet3.PipeDown.x = this.pipeDown3.pos.x;

	};

	Pipes.prototype.reset = function() {
			this.pipeUp1.pos1.x1 = INITIAL_POSITION_X1;
			this.pipeUp1.pos1.y1 = INITIAL_POSITION_Y1;
			this.pipeDown1.pos2.x2 = INITIAL_POSITION_X2;
			this.pipeDown1.pos2.y2 = INITIAL_POSITION_Y2;

			this.pipeUp2.pos.x = INITIAL_POSITION_X1 + 60;
			this.pipeUp2.pos.y = INITIAL_POSITION_Y1;
			this.pipeDown2.pos.x = INITIAL_POSITION_X2 + 60;
			this.pipeDown2.pos.y = INITIAL_POSITION_Y2;

			this.pipeUp3.pos.x = INITIAL_POSITION_X1 + 120;
			this.pipeUp3.pos.y = INITIAL_POSITION_Y1;
			this.pipeDown3.pos.x = INITIAL_POSITION_X2 + 120;
			this.pipeDown3.pos.y = INITIAL_POSITION_Y2;

			this.StartIntervalChain();
	};


	return Pipes;
})();

'use strict';
var
//el = document.getElementById('myCanvas'),
ctx,
canvas,
width,
height;

/*frames,
score,
best,

currentState,
state = {
  Splahs: 0, Game: 1, Score: 2
},

bird = {

},

pipes = {

};*/


function main() {

  canvas = document.createElement('canvas');

  width = window.innerWidth;
  height = window.innerHeight;

  if(width >= 500){
    width = 320;
    height = 480;
    canvas.style.border = '1px solid #000';
  }

  canvas.width = width;
  canvas.height = height;
  ctx = canvas.getContext('2d');

  document.body.appendChild(canvas);

  var img = new Image();

  img.onload = function () {

    window.requestAnimationFrame(this.onFrame);

  };
  img.src = 'assets/images/pipe.png';

}

main();

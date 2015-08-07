//house vars
  var boardCol = 40;
  var boardRow = 40;
  var janusCol = 20;
  var janusRow = 20;
  var foodCol = null;
  var foodRow = null;
  var timer = 500;
  var direction = null;
  var tribbles = [];

function renderBoard() {
  document.getElementById('board').innerHTML = '';
  for (i = 1; i < boardRow +1 ; i++) { 
    $('#board').append('<div class="row" id="row'+i+'"></div>');
    for (j = 1; j < boardCol +1 ; j++) { 
      $('#row' + i).append('<div class="col square" id="col'+j+'row'+i+'" ></div>');
    };
  };
  janusWalks();
  dropFood();
  listen();
};

function dropFood(){
  if (foodCol === janusCol && foodRow === janusRow) {
    shed();
    findFood();
    timer *= 0.9;
    clearInterval( execute );
    execute = setInterval(renderBoard, timer);
  } else if (foodRow === null) {
    findFood();
    tapfood();
  } else {
    tapfood();
  };
};

  function findFood(){
    foodCol = Math.floor((Math.random() * 40) + 1);
    foodRow = Math.floor((Math.random() * 40) + 1);
  };

  function tapfood(){

    $('#col'+foodCol+'row'+foodRow).css('background-image', 'url(images/crumbs.jpeg)');
  };

function janusWalks(){
  updateTrail(janusCol, janusRow);
  switch(direction) {
    case 'left':
      janusCol -= 1;
      break;
    case 'up':
      janusRow -= 1;
      break;
    case 'right':
      janusCol += 1;
      break;
    case 'down':
      janusRow += 1;
      break;
    default: break;
  }
  snork();
  if (janusCol < boardCol + 1 && janusRow < boardRow + 1 && janusCol > 0 && janusRow > 0) {
    $('#col' + janusCol + 'row' + janusRow).css('background-image', 'url(images/janus.jpg)');
    layTrail();
  } else {    
    alert('You ran into the wall, dummy!');
    reset();
  };
};

function shed(){

  tribbles.push([janusCol, janusRow]);
};

function updateTrail(col, row){
  if (tribbles.length > 0) {
    for (var i = tribbles.length-1; i > 0; i--) {
      tribbles[i] = tribbles[i-1];
    };
    tribbles[0] = [col, row];
  };
};

function layTrail(){
  for (var i = 0; i < tribbles.length; i++) {
    $('#col' + tribbles[i][0] + 'row' + tribbles[i][1]).css('background-image', 'url(images/tribble.jpeg)');
  };
};

function snork(){
  for (var i = 0; i < tribbles.length; i++) {
    console.log(tribbles[i]);
    var hairBall = [[janusCol, janusRow]];
    console.log(hairBall[0])
    if (tribbles[i][0] === hairBall[0][0] && tribbles[i][1] === hairBall[0][1]) {
      alert("Don't eat that!");
      reset();
    };
  };
};

function listen(){
  $(document).keydown(function(e) {
    switch(e.which) {
      case 37:
        if (direction !== 'right') {
          direction = 'left';
        };
        break;
      case 38:
        if (direction !== 'down') {
          direction = 'up';
        };
        break;
      case 39:
        if (direction !== 'left') {
          direction = 'right';
        };
        break;
      case 40:
        if (direction !== 'up') {
          direction = 'down';
        };
        break;
      default: return;
    }
    e.preventDefault();
  });
};

function reset(){
  clearInterval( execute );
  janusCol = 20;
  janusRow = 20;
  direction = null;
  timer = 500;
  tribbles = [];
  execute = setInterval(renderBoard, timer);
};

$(document).ready(function(){
  
  execute = setInterval(renderBoard, timer);
});













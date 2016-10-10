var canvas = document.getElementById('eta-canvas');
var context = canvas.getContext('2d');
var timeSpots = [];

var draw = function(context, x, y, fillcolor, radius, linewidth, strokestyle, fontcolor, textalign, fonttype, filltext) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = fillcolor;
  context.fill();
  context.lineWidth = linewidth;
  context.strokestyle = strokestyle;
  context.stroke();

  context.fillStyle = fontcolor;
  context.textAlign = textalign;
  context.font = fonttype;

  context.fillText(filltext, x, y);
};

var Circle = function(x, y, radius) {
  this.left = x - radius;
  this.top = y - radius;
  this.right = x + radius;
  this.bottom = y + radius;
};

var drawCircle = function(context, x, y, fillcolor, radius, linewidth, strokestyle, fontcolor, textalign, fonttype, filltext, timeSpots) {
  console.log('begin', timeSpots);
  draw(context, x, y, fillcolor, radius, linewidth, strokestyle, fontcolor, textalign, fonttype, filltext);
  var timeSpot = new Circle(x, y, radius);
  timeSpots.push(timeSpot);
  console.log('end', timeSpot, timeSpots);
};

drawCircle(context, 300, canvas.height / 2, 'blue', 40, 5, '#003300', 'white', 'center', 'bold 2rem Arial', 'B', timeSpots);


$('#eta-canvas').on('click', function(e){
  var clickedX = e.pageX - this.offsetLeft;
  var clickedY = e.pageY - this.offsetTop;

  for (var i = 0; i < circles.length; i++) {
    if (clickedX < timeSpots[i].right && clickedX > timeSpots[i].left && clickedY > timeSpots[i].top && clickedY < timeSpots[i].bottom) {
      console.log('clicked number', (i + 1));
    }
  }
});

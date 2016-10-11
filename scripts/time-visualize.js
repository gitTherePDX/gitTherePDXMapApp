var canvas = document.getElementById('eta-canvas');
var context = canvas.getContext('2d');
var etaDots = [];

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

var drawCircle = function(context, x, y, fillcolor, radius, linewidth, strokestyle, fontcolor, textalign, fonttype, filltext, etaDots, getInfo) {
  draw(context, x, y, fillcolor, radius, linewidth, strokestyle, fontcolor, textalign, fonttype, filltext);
  var etaDot = new Circle(x, y, radius);
  etaDots.push(etaDot);
};

$('#eta-canvas').on('click', function(e){
  var clickedX = e.pageX - this.offsetLeft;
  var clickedY = e.pageY - this.offsetTop;

  for (var i = 0; i < etaDots.length; i++) {
    if (clickedX < etaDots[i].right && clickedX > etaDots[i].left && clickedY > etaDots[i].top && clickedY < etaDots[i].bottom) {
      // console.log('clicked number', (i + 1));
    }
  }
});

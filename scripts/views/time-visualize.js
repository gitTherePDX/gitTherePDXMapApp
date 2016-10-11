var canvas = document.getElementById('eta-canvas');
var context = canvas.getContext('2d');
var etaLogos = [];

var Logo = function(x, y) {
  this.left = x;
  this.top = y;
  this.right = x + canvas.width/10;
  this.bottom = y + canvas.height/5;
  console.log(this.left, x, this.top, y, this.right, x + canvas.width/10, this.bottom, y + canvas.height/5);
};

var drawLogo = function(context, x, y, imgId, etaLogos) {
  var img = document.getElementById(imgId);
  context.drawImage(img,x,y,canvas.width/10,canvas.height/5); //add a width and height based on canvas.size/window.size
  var etaLogo = new Logo(x, y);
  etaLogos.push(etaLogo);
};

$('#eta-canvas').on('click', function(e){
  var clickedX = e.pageX - this.offsetLeft;
  var clickedY = e.pageY - this.offsetTop;

  for (var i = 0; i < etaLogos.length; i++) {
    if (clickedX < etaLogos[i].right && clickedX > etaLogos[i].left
        &&
        clickedY > etaLogos[i].top && clickedY < etaLogos[i].bottom) {
      console.log('clicked logo', etaLogos[i]);
    }
  }
});

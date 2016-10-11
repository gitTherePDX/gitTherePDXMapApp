var canvas = document.getElementById('eta-canvas');
var context = canvas.getContext('2d');
var etaLogos = [];

var Logo = function(x, y) {
  this.left = x;
  this.top = y;
  this.right = x + canvas.clientWidth/20;
  this.bottom = y + canvas.clientHeight/5;
  console.log('topleft', this.left, this.top, 'topright', this.right, this.top, 'bottomleft', this.left, this.bottom, 'bottomright', this.right, this.bottom);
};

var drawLogo = function(context, x, y, imgId) {
  var img = document.getElementById(imgId);
  context.drawImage(img,x,y,canvas.clientWidth/20,canvas.clientHeight/5); //add a width and height based on canvas.size/window.size

  var etaLogo = new Logo(x, y);
  etaLogos.push(etaLogo);
  console.log(etaLogo);
  console.log('clientwidth=', canvas.clientWidth, 'clientheight=', canvas.clientHeight);
};

$('#eta-canvas').on('click', function(e){
  var clickedX = e.pageX - this.offsetLeft;
  var clickedY = e.pageY - this.offsetTop;
  console.log(clickedX + ', ' + clickedY);
  for (var i = 0; i < etaLogos.length; i++) {
    if (clickedX < etaLogos[i].right && clickedX > etaLogos[i].left
        &&
        clickedY > etaLogos[i].top && clickedY < etaLogos[i].bottom) {
      console.log('clicked logo', etaLogos[i]);
    }
  }
});

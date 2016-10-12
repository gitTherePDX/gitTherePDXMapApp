'use strict';

(function(module) {

  var etaObject = {};

  etaObject.canvas = document.getElementById('eta-canvas');
  etaObject.canvas.width = etaObject.canvas.clientWidth;
  etaObject.canvas.height = etaObject.canvas.clientHeight;
  etaObject.context = etaObject.canvas.getContext('2d');

  etaObject.etaLogos = [];

  etaObject.Logo = function(x, y) {
    this.left = x;
    this.top = y;
    this.right = x + etaObject.canvas.clientWidth;
    this.bottom = y + etaObject.canvas.clientHeight;
  };

  etaObject.drawLogo = function(context, x, y, imgId) {
    var img = document.getElementById(imgId);
    //draw the logo
    context.drawImage(img,x,y);

    var etaLogo = new etaObject.Logo(x, y);
    etaObject.etaLogos.push(etaLogo);
    console.log(etaLogo);
    console.log('clientwidth=', etaObject.canvas.clientWidth, 'clientheight=', etaObject.canvas.clientHeight);
  };

  etaObject.buildCanvas = function() {
  //clear canvas on update
    etaObject.context.clearRect(0, 0, etaObject.canvas.width, etaObject.canvas.height);
    //gradient for style on update
    var grd=etaObject.context.createLinearGradient(0,0,etaObject.canvas.clientWidth,0);
    grd.addColorStop(0,'white');
    grd.addColorStop(1,'black');

    etaObject.context.fillStyle=grd;
    etaObject.context.fillRect(0,0,etaObject.canvas.clientWidth,etaObject.canvas.clientHeight);
  };

  etaObject.etaTransform = function(eta) {
    var zoom;
    if (filterData.zoom === '18') {
      zoom = 300;
    }else if (filterData.zoom === '17') {
      zoom = 420;
    }else if (filterData.zoom === '16') {
      zoom = 800;
    }

    var etaTransform = eta / zoom * etaObject.canvas.clientWidth;
    return etaTransform;
  };

  module.etaObject = etaObject;
})(window);

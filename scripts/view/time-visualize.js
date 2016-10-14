'use strict';

//methods and data for canvas graph

(function(module) {

  var etaObject = {};

  etaObject.canvas = document.getElementById('eta-canvas');
  etaObject.canvas.width = etaObject.canvas.clientWidth;
  etaObject.canvas.height = etaObject.canvas.clientHeight;
  etaObject.context = etaObject.canvas.getContext('2d');

  //array for logos in canvas
  //etaObject.etaLogos = [];

  //TODO: wire up clicks to logos in the canvas
  //this constructor object holds vertices for logo created
  // etaObject.Logo = function(x, y) {
  //   this.left = x;
  //   this.top = y;
  //   this.right = x + etaObject.canvas.clientWidth;
  //   this.bottom = y + etaObject.canvas.clientHeight;
  // };

  //draws the canvas graph
  etaObject.drawLogo = function(context, eta, imgId) {
    var yDivisor;
    var color;
    var img = document.getElementById(imgId);

    if (imgId === 'uber-logo') {
      yDivisor = 2.5;
      color = 'rgba(48,48,48,0.75)';
    }else if (imgId === 'lyft-logo') {
      yDivisor = 1.35;
      color = 'rgba(205,41,144,0.75)';
    }else if (imgId === 'bike-logo') {
      yDivisor = 8;
      color = 'rgba(255,69,0,0.75)';
    }

    //draw graph bars
    etaObject.context.beginPath();
    etaObject.context.rect(40, (etaObject.canvas.clientHeight / yDivisor) + 5, (etaObject.canvas.clientWidth * eta) / 600, etaObject.canvas.clientHeight / 6.3);
    etaObject.context.fillStyle = color;
    etaObject.context.fill();

    //draw the logo
    etaObject.context.drawImage(img,0,etaObject.canvas.clientHeight / yDivisor);

    //TODO: wire up clicks to logos in the canvas
    //pushes new logo into array
    // var etaLogo = new etaObject.Logo(x, y);
    // etaObject.etaLogos.push(etaLogo);
    // //console.log(etaLogo);
    // console.log('clientwidth=', etaObject.canvas.clientWidth, 'clientheight=', etaObject.canvas.clientHeight);
  };

  //initializes canvas
  etaObject.buildCanvas = function() {
    //clear canvas on update
    etaObject.context.clearRect(0, 0, etaObject.canvas.width, etaObject.canvas.height);

    //gradient for canvas style
    var grd=etaObject.context.createLinearGradient(0,0,etaObject.canvas.clientWidth,0);
    grd.addColorStop(0,'white');
    grd.addColorStop(1,'black');
    etaObject.context.fillStyle = grd;
    etaObject.context.fillRect(0,0,etaObject.canvas.clientWidth,etaObject.canvas.clientHeight);

    //add text for top scale
    etaObject.context.fillStyle = 'red';
    etaObject.context.font = '1.5rem sansserif';
    etaObject.context.fillText('0 min', 40, 20);
    etaObject.context.font = '1.5rem sansserif';
    etaObject.context.fillText('5 min', (etaObject.canvas.clientWidth / 2) - 40, 20);
    etaObject.context.font = '1.5rem sansserif';
    etaObject.context.fillText('10 min', (etaObject.canvas.clientWidth - 80), 20);
  };

  //TODO: wire up logos in canvas clickhandlers
  // etaObject.etaTransform = function(eta) {
  //   var zoom;
  //   if (filterData.zoom === 18) {
  //     zoom = 300;
  //   }else if (filterData.zoom === 17) {
  //     zoom = 420;
  //   }else if (filterData.zoom === 16) {
  //     zoom = 800;
  //   }
  //   var etaTransform = eta / zoom * etaObject.canvas.clientWidth;
  //   return etaTransform;
  // };

  module.etaObject = etaObject;
})(window);

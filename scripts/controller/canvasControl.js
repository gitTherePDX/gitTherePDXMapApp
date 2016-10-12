'use strict';

$('form').on('submit', function(event){
  event.preventDefault();

  etaObject.buildCanvas();

  if (filterData.Lyft){
    lyftObject.callApi(etaObject.drawLogo);
  }

  if (filterData.Uber) {
    uberObject.getInfo(etaObject.drawLogo);
  }
  //if (filterData.Biketown) biketownObject.getInfo(etaObject.drawLogo);
});

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
  };

  //if (filterData.Biketown) biketownObject.getInfo(drawLogo);
});

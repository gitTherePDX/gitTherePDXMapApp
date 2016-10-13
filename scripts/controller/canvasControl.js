'use strict';

$('form').on('submit', function(event){
  event.preventDefault();


  //etaObject.buildCanvas();

  // if (filterData.Lyft){
  //   //lyftObject.callApi(etaObject.drawLogo);
  // }
  //
  // if (filterData.Uber) {
  //
  //   //uberObject.getInfo(etaObject.drawLogo);
  // }
  //if (filterData.Biketown) biketownObject.getInfo(etaObject.drawLogo);
});

$('#eta-canvas').on('click', function(e){
  var clickedX = e.pageX - this.offsetLeft;
  var clickedY = e.pageY - this.offsetTop;

  console.log(clickedX + ', ' + clickedY);
  for (var i = 0; i < etaObject.etaLogos.length; i++) {
    if (clickedX < etaObject.etaLogos[i].right && clickedX > etaObject.etaLogos[i].left
    &&
    clickedY > etaObject.etaLogos[i].top && clickedY < etaObject.etaLogos[i].bottom) {
      console.log('clicked logo', etaObject.etaLogos[i]);
    }
  };

  //if (filterData.Biketown) biketownObject.getInfo(drawLogo);
});

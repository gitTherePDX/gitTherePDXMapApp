'use strict';

$('form').on('submit', function(event){
  event.preventDefault();
  console.log(filterData.Lyft);
  if (filterData.Lyft){
    lyftObject.getInfo(drawLogo);
  }

  console.log(filterData.Uber);
  if (filterData.Uber) {
    uberObject.getInfo(drawLogo);
  }
  //if (filterData.Biketown) biketownObject.getInfo(drawLogo);
  
});

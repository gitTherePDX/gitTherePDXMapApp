'use strict';

(function(module) {

  var lyftObjectApi = {};

  lyftObject.dataAll = [];


  lyftObject.attachEta = function() {
    var lyft = lyftObject.dataAll.filter(function(car){
      return car.display_name === 'Lyft';
    });
    var eta = lyft[0].eta_seconds;
    //console.log('lyft eta from attachEta', eta);
    return eta;
  };


  lyftObject.callApi = function() {

    var longitude = '-122.6765';
    var latitude = '45.5231';
    var ajaxQuery = {
      url: 'data/lyft.json',
      type: 'GET',
      success: function(data, textStatus, jqXHR) {

        console.log('yay!!!!');
        var zoom;
        lyftObject.dataAll = data;
        var eta = lyftObject.attachEta();
        driverEta.lyftEta(eta);
        if (filterData.zoom === '18') {
          zoom = 300;
        }else if (filterData.zoom === '17') {
          zoom = 420;
        }else if (filterData.zoom === '16') {
          zoom = 800;
        }

        var etaTransform = eta / zoom * etaObject.canvas.clientWidth;
        console.log('eta = ', eta, 'zoom = ', zoom, 'transformed = ', etaTransform);
        callback(etaObject.context, etaTransform, etaObject.canvas.clientHeight / 6, 'lyft-logo', etaObject.etaLogos);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
      }
    };
    $.ajax(ajaxQuery);
  };

  module.lyftObject = lyftObject;
  //lyftObject.getInfo(drawLogo);
})(window);

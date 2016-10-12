'use strict';

(function(module) {

  var uberObject = {};

  uberObject.dataAll = [];

  uberObject.attachEta = function() {
    var uberX = uberObject.dataAll.filter(function(car){
      return car.display_name === 'uberX';
    });
    var eta = uberX[0].estimate;
    console.log('uber eta from attachEta', eta);
    return eta;
  };

  uberObject.getInfo = function(callback) {
    var longitude = '-122.6765';
    var latitude = '45.5231';
    var ajaxQuery = {
      //url: 'http://localhost:3000/uber/' + latitude + '/' + longitude,
      url: 'data/uber.json',
      type: 'GET',
      success: function(data, textStatus, jqXHR) {
        //uberObject.dataAll = data.times;
        var zoom;
        uberObject.dataAll = data;
        var eta = uberObject.attachEta();
        driverEta.uberEta(eta);
        if (filterData.zoom === '18') {
          zoom = 300;
        }else if (filterData.zoom === '17') {
          zoom = 420;
        }else if (filterData.zoom === '16') {
          zoom = 800;
        }

        var etaTransform = eta / zoom * etaObject.canvas.clientWidth;
        callback(etaObject.context, etaTransform, etaObject.canvas.clientHeight/10, 'uber-logo', etaObject.etaLogos);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        // console.log('What happened?');
        // console.log(jqXHR, textStatus, errorThrown);
      }
    };
    $.ajax(ajaxQuery);
  };

  module.uberObject = uberObject;
  //uberObject.getInfo(etaObject.drawLogo);
})(window);

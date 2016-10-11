'use strict';

(function(module) {

  var uberObject = {};

  uberObject.dataAll = [];

  uberObject.attachEta = function() {
    var uberX = uberObject.dataAll.filter(function(car){
      return car.display_name === 'uberX';
    });
    var eta = uberX[0].estimate;
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
        uberObject.dataAll = data;
        var eta = uberObject.attachEta();
        callback(context, eta, canvas.height / 8, 'uber-logo', etaLogos);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        // console.log('What happened?');
        // console.log(jqXHR, textStatus, errorThrown);
      }
    };
    $.ajax(ajaxQuery);
  };

  module.uberObject = uberObject;
  uberObject.getInfo(drawLogo);
})(window);

'use strict';

(function(module) {

  var uberObject = {};

  uberObject.dataAll = [];

  uberObject.attachEta = function() {
    var uberX = uberObject.dataAll.times.filter(function(car){
      return car.display_name === 'uberX';
    });
    var eta = uberX[0].estimate;
    //console.log('uber eta from attachEta', eta);
    return eta;
  };

  uberObject.getInfo = function(callback, selectionObject) {
    var longitude = selectionObject.lng;
    var latitude = selectionObject.lat;
    var ajaxQuery = {
      url: '/uber/' + latitude + '/' + longitude,
      //url: 'data/uber.json',
      type: 'GET',
      success: function(data, textStatus, jqXHR) {
        //uberObject.dataAll = data.times;

        uberObject.dataAll = data;
        var eta = uberObject.attachEta();

        var etaTransform = etaObject.etaTransform(eta);

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

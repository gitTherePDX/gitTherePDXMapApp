'use strict';

(function(module) {

  var lyftObjectApi = {};

  lyftObject.dataAll = [];

  lyftObject.callApi = function() {
    var longitude = '-122.6765';
    var latitude = '45.5231';
    var ajaxQuery = {
      url: 'data/lyft.json',
      type: 'GET',
      success: function(data, textStatus, jqXHR) {

        console.log('yay!!!!');
        lyftObject.dataAll = data;
        var eta = lyftObject.attachEta();

        var etaTransform = etaObject.etaTransform(eta);
        
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

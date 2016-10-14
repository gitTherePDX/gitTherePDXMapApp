'use strict';

(function(module) {
  //all the uber api data

  var uberObject = {};

  uberObject.dataAll = [];

  uberObject.attachEta = function() {
    var uberX = uberObject.dataAll.times.filter(function(car){
      return car.display_name === 'uberX';
    });
    var eta = uberX[0].estimate;
    return eta; //returns eta in seconds
  };
  //routes uber req with lat & lon to server
  uberObject.getInfo = function(callback, selectionObject) {
    var longitude = selectionObject.lng;
    var latitude = selectionObject.lat;
    var ajaxQuery = {
      url: '/uber/' + latitude + '/' + longitude,
      type: 'GET',
      success: function(data, textStatus, jqXHR) {
        uberObject.dataAll = data;
        var eta = uberObject.attachEta();
        moreInfo.uberEta(eta);
        callback(etaObject.context, eta, 'uber-logo');
      },
      error: function(jqXHR, textStatus, errorThrown) {
        //TODO: decide if needed for future development
        // console.log('What happened?');
        // console.log(jqXHR, textStatus, errorThrown);
      }
    };
    $.ajax(ajaxQuery);
  };

  module.uberObject = uberObject;
})(window);

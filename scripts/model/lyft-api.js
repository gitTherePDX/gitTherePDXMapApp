'use strict';

(function(module) {

  var lyftObject = {};

  lyftObject.dataAll = [];

  lyftObject.attachEta = function() {
    var lyft = lyftObject.dataAll.filter(function(car){
      return car.display_name === 'Lyft';
    });
    var eta = lyft[0].eta_seconds;
    return eta;
  };

  lyftObject.getInfo = function(callback) {
    var longitude = '-122.6765';
    var latitude = '45.5231';
    var ajaxQuery = {
      url: 'data/lyft.json',
      type: 'GET',
      success: function(data, textStatus, jqXHR) {
        lyftObject.dataAll = data;
        var eta = lyftObject.attachEta();
        callback(context, eta , canvas.height / 2, 'blue', 20, 2, 'white', 'white', 'center', 'bold 1rem Arial', 'L', etaDots);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        //console.log(jqXHR, textStatus, errorThrown);
      }
    };
    $.ajax(ajaxQuery);
  };

  module.lyftObject = lyftObject;
  lyftObject.getInfo(drawCircle);
})(window);

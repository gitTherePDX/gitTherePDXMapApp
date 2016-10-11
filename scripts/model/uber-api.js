'use strict';

(function(module) {

  var uberObject = {};

  uberObject.dataAll = [];

  uberObject.attachEta = function() {
    var uberX = uberObject.dataAll.filter(function(car){
      return car.display_name === 'uberX';
    });
    var eta = uberX[0].estimate;
    console.log('uber eta ', eta);
  };

  uberObject.getInfo = function() {
    var longitude = '-122.6765';
    var latitude = '45.5231';
    var ajaxQuery = {
      //url: 'http://localhost:3000/uber/' + latitude + '/' + longitude,
      url: 'data/uber.json',
      type: 'GET',
      success: function(data, textStatus, jqXHR) {
        //uberObject.dataAll = data.times;
        uberObject.dataAll = data;
        // console.log(data);
        // console.log(textStatus);
        // console.log(jqXHR);
        uberObject.attachEta();
      },
      error: function(jqXHR, textStatus, errorThrown) {
        // console.log('What happened?');
        // console.log(jqXHR, textStatus, errorThrown);
      }
    };
    $.ajax(ajaxQuery);
  };

  module.uberObject = uberObject;
  uberObject.getInfo();
})(window);

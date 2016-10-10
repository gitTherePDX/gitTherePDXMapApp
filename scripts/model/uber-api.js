'use strict';

(function(module) {

  var uberObject = {};

  uberObject.dataAll = [];

  uberObject.getInfo = function() {
    var longitude = '-122.6765';
    var latitude = '45.5231';
    var ajaxQuery = {
      url: 'http://localhost:3000/uber/' + latitude + '/' + longitude,
      type: 'GET',
      success: function(data, textStatus, jqXHR) {
        uberObject.dataAll = data.times;
        console.log(data);
        console.log(textStatus);
        console.log(jqXHR);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('What happened?');
        console.log(jqXHR, textStatus, errorThrown);
      }
    };
    $.ajax(ajaxQuery);
  };

  module.uberObject = uberObject;
  uberObject.getInfo();
})(window);

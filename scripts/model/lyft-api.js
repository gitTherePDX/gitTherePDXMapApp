'use strict';

(function(module) {

  var lyftObject = {};

  lyftObject.dataAll = [];

  lyftObject.attachEta = function() {
    var lyft = lyftObject.dataAll.filter(function(car){
      return car.display_name === 'Lyft';
    });
    var eta = lyft[0].eta_seconds;
    console.log('lyft eta from attachEta', eta);
    return eta;
  };

  lyftObject.getInfo = function(callback, selectionObject) {
    var longitude = selectionObject.lng;
    var latitude = selectionObject.lat;
    var ajaxQuery = {
      url: 'http://localhost:3000/lyft/' + latitude + '/' + longitude,
      type: 'GET',
      success: function(data, textStatus, jqXHR) {
        lyftObject.dataAll = data;
        var eta = lyftObject.attachEta();
        console.log('get info worked');
        var etaTransform = etaObject.etaTransform(eta);

        callback(etaObject.context, etaTransform, etaObject.canvas.clientHeight / 6, 'lyft-logo', etaObject.etaLogos);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
        if (jqXHR.status === 401) {
          lyftObject.getToken();
          console.log('running get token');
        }
      }
    };
    $.ajax(ajaxQuery);
  };

  lyftObject.getToken = function() {
    $.ajax({
      url: 'http://localhost:3000/tokenlyft/',
      type: 'POST',
      success: function(data,textStatus, jqXHR) {
        lyftObject.getInfo(etaObject.drawLogo,googleMapping.currentLocation);
        console.log(data.token_type);
      }
    });
  };

  module.lyftObject = lyftObject;
  //lyftObject.getInfo(drawLogo);
})(window);

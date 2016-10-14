'use strict';

(function(module) {
  //all the lyft api data

  var lyftObject = {};

  lyftObject.dataAll = [];

  lyftObject.attachEta = function() {
    var lyft = lyftObject.dataAll.filter(function(car){
      return car.display_name === 'Lyft';
    });
    var eta = lyft[0].eta_seconds;
    return eta; //return eta in seconds
  };
  //routes lyft req with lat & lon to server
  lyftObject.getInfo = function(callback, selectionObject) {
    var longitude = selectionObject.lng;
    var latitude = selectionObject.lat;
    var oauth = filterData.LyftOAuth;
    var ajaxQuery = {
      url: '/lyft/' + latitude + '/' + longitude + '/' + oauth,
      type: 'GET',
      success: function(data, textStatus, jqXHR) {
        lyftObject.dataAll = data.eta_estimates;
        var eta = lyftObject.attachEta();
        moreInfo.lyftEta(eta);
        //TODO: for changing max wait/walk town
        //var etaTransform = etaObject.etaTransform(eta);
        callback(etaObject.context, eta,'lyft-logo');
      },
      error: function(jqXHR, textStatus, errorThrown) {
        //on 401 get new OAuth token and reroutes
        if (jqXHR.status === 401) {
          lyftObject.getToken(selectionObject, callback);
        }
      }
    };
    $.ajax(ajaxQuery);
  };

  //connects to lyft to get a new OAuth token
  lyftObject.getToken = function(dataObject, callback) {
    var latitude = dataObject.lat;
    var longitude = dataObject.lng;
    var oauth = filterData.LyftOAuth;
    $.ajax({
      url: '/tokenlyft/' + latitude + '/' + longitude + '/' + oauth,
      type: 'POST',
      success: function(data,textStatus, jqXHR) {
        filterData.LyftOAuth = data.req.headers.authorization.split(' ')[1];
        lyftObject.dataAll = JSON.parse(data.text).eta_estimates;
        var eta = lyftObject.attachEta();
        moreInfo.lyftEta(eta);
        //for logos in canvas click handlers
        //var etaTransform = etaObject.etaTransform(eta);
        callback(etaObject.context, eta, 'lyft-logo');
      }
    });
  };

  module.lyftObject = lyftObject;
})(window);

'use strict';

(function(module) {

  var lyftObject = {};

  lyftObject.dataAll = [];

  lyftObject.attachEta = function() {
    console.log('dataAll contains', lyftObject.dataAll);
    var lyft = lyftObject.dataAll.filter(function(car){
      return car.display_name === 'Lyft';
    });
    var eta = lyft[0].eta_seconds;
    //console.log('lyft eta from attachEta', eta);
    return eta;
  };

  lyftObject.getInfo = function(callback, selectionObject) {
    var longitude = selectionObject.lng;
    var latitude = selectionObject.lat;
    var oauth = filterData.LyftOAuth;
    var ajaxQuery = {
      url: '/lyft/' + latitude + '/' + longitude + '/' + oauth,
      type: 'GET',
      success: function(data, textStatus, jqXHR) {
        lyftObject.dataAll = data.eta_estimates;
        console.log(lyftObject.dataAll);
        var eta = lyftObject.attachEta();
        moreInfo.lyftEta(eta);
        console.log('get info worked');
        var etaTransform = etaObject.etaTransform(eta);
        callback(etaObject.context, etaTransform, etaObject.canvas.clientHeight / 6, 'lyft-logo', etaObject.etaLogos);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
        if (jqXHR.status === 401) {
          lyftObject.getToken(selectionObject, callback);
          console.log('running get token');
        }
      }
    };
    $.ajax(ajaxQuery);
  };

  lyftObject.getToken = function(dataObject, callback) {
    var latitude = dataObject.lat;
    var longitude = dataObject.lng;
    var oauth = filterData.LyftOAuth;
    $.ajax({
      url: '/tokenlyft/' + latitude + '/' + longitude + '/' + oauth,
      type: 'POST',
      success: function(data,textStatus, jqXHR) {
        console.log(data);
        filterData.LyftOAuth = data.req.headers.authorization.split(' ')[1];
        lyftObject.dataAll = JSON.parse(data.text).eta_estimates;
        //console.log(filterData.LyftOAuth);

        var eta = lyftObject.attachEta();
        moreInfo.lyftEta(eta);
        //console.log('get info worked');
        var etaTransform = etaObject.etaTransform(eta);
        callback(etaObject.context, eta, 'lyft-logo');
      }
    });
  };

  module.lyftObject = lyftObject;
  //lyftObject.getInfo(drawLogo);
})(window);

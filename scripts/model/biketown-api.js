'use strict';

(function(module) {
  //all the biketown api data

  var biketownObject = {};

  biketownObject.allStations = [];

  biketownObject.closestStation;

  biketownObject.getTimefromOrigin = function(origin, marker) {
    var lat1 = origin.lat;
    var lon1 = origin.lng;

    var lat2 = marker.lat;
    var lon2 = marker.lon;

    var R = 6371; //Radius of the earth in km
    var dLat = (lat2-lat1) * (Math.PI/180);
    var dLon = (lon2-lon1) * (Math.PI/180);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * (Math.PI/180)) * Math.cos(lat2 * (Math.PI/180)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c * 5 / 8; //approx distance in miles
    return d * 1161; //approx distance in seconds
  };

  //station information data - latitude & longitude
  biketownObject.getStationInfo = function(firstcallback,drawCallback) {
    $.ajax({
      url: '/biketown/',
      method: 'GET',
      //on success data from api
      success: function(data) {
        biketownObject.allStations = data.data.stations;
        googleMapping.map = googleMapping.createMap(filterData.zoom, googleMapping.currentLocation);
        biketownObject.allStations = biketownObject.allStations.map(function(object){
          object['time2Origin'] = biketownObject.getTimefromOrigin(googleMapping.currentLocation, object);
          return object;
        });
        biketownObject.closestStation =
        biketownObject.allStations.reduce(function(a,b) {
          if (a.time2Origin > b.time2Origin) {
            return b;
          }else {
            return a;
          }
        }); //returns object w/time2Origin property in secs for drawLogo
        var eta = biketownObject.closestStation.time2Origin;
        firstcallback();
        drawCallback(etaObject.context, eta, 'bike-logo');
      },
      //on error data from local json file
      error: function() {
        $.ajax({
          url: 'data/biketownlocationbackup.json',
          method: 'GET',
          success: function(data) {
            biketownObject.allStations = data.data.stations;
            googleMapping.map = googleMapping.createMap(filterData.zoom, googleMapping.currentLocation);
            biketownObject.allStations = biketownObject.allStations.map(function(object){
              object['time2origin'] = biketownObject.getTimefromOrigin(googleMapping.currentLocation, object);
              return object;
            });
            biketownObject.closestStation = biketownObject.allStations.reduce(function(a,b) {
              if (a.time2Origin > b.time2Origin) {
                return b;
              }else {
                return a;
              }
            });
            var eta = biketownObject.closestStation.time2Origin;
            firstcallback();
            drawCallback(etaObject.context, eta, 'bike-logo');
          }
        });
      }
    });
  };

  module.biketownObject = biketownObject;
})(window);

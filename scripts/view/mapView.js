'use strict';

(function(module) {
  var mapViews = {};

  mapViews.allMarkers = [];

  mapViews.createMarkers = function(firstcallback, secondcallback) {
    //will use this array temporarily until we get more data;
    googleMapping.locationsAddressesLatLng.forEach(function(object) {
      mapViews.allMarkers.push(new google.maps.Marker({
        position: object,
      }));
    });
    firstcallback(googleMapping.getCurrentLocation, secondcallback);
  };

  mapViews.setCurrentLocation = function() {

  };

  mapViews.setMapOnAll = function(map) {
    mapViews.allMarkers.forEach(function(object) {
      object.setMap(map);
    });
  };

  mapViews.clearMapMarkers = function() {
    mapViews.setMapOnAll(null);
  };

  mapViews.deleteMapMarkers = function() {
    mapViews.clearMapMarkers();
    mapViews.allMarkers = [];
  };

  module.mapViews = mapViews;
  mapViews.createMarkers(googleMapping.initMap, mapViews.setMapOnAll);
})(window);

'use strict';

(function(module) {
  var mapViews = {};

  mapViews.allMarkers = [];

  mapViews.createMarkers = function() {
    //will use this array temporarily until we get more data;
    googleMapping.locationsAddressesLatLng.forEach(function(object) {
      mapViews.allMarkers.push(new google.maps.Marker({
        position: object,
      }));
    });
    //firstcallback(googleMapping.getCurrentLocation, secondcallback);
  };

  mapViews.setCurrentLocation = function() {

  };

  mapViews.changeZoom = function () {
    $('#wait-time').on('change', 'input[type="radio"]', function() {
      var zoom = parseInt($(this).val());
      googleMapping.map.setZoom(zoom);
      //keeps track of the current zoom
      filterData.zoom = zoom;
    });
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

  mapViews.initializePage = function() {
    mapViews.changeZoom();
    //might want to make this function a callback of createMarkers
    mapViews.createMarkers();
  };

  module.mapViews = mapViews;
  mapViews.initializePage();
})(window);

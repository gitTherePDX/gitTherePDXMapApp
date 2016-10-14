'use strict';

(function(module) {
  var mapViews = {};

  mapViews.allMarkers = [];
  mapViews.currentMarker;

  mapViews.createMarkers = function() {
    //will use this array temporarily until we get more data;
    biketownObject.allStations.forEach(function(object) {
      mapViews.allMarkers.push(new google.maps.Marker({
        position: { lat: object.lat, lng: object.lon},
        label: 'BT'
      }));
    });
    //add current location marker
    mapViews.currentMarker = new google.maps.InfoWindow({
      map: googleMapping.map
    });
    mapViews.currentMarker.setPosition(googleMapping.currentLocation);
    mapViews.currentMarker.setContent('You are here.');
    mapViews.setMapOnAll(googleMapping.map);
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

  mapViews.setUpHamburger = function() {
    $('.icon-menu').on('click', function(event) {
      var $this = $(this);
      var $ul = $(this).parents('nav').find('ul');
      $ul.slideToggle();
    });
  };

  mapViews.initializePage = function() {
    mapViews.changeZoom();
    mapViews.setUpHamburger();
    //might want to make this function a callback of createMarkers
  };

  module.mapViews = mapViews;
  mapViews.initializePage();
})(window);

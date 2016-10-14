'use strict';

//methods to map data to put map & components on page

(function(module) {
  var mapViews = {};

  mapViews.allMarkers = [];
  mapViews.currentMarker;

  //using objects in mapViewsallMarkers to put them onto map
  mapViews.createMarkers = function() {
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
  };

  mapViews.setCurrentLocation = function() {

  };

  //TODO: hook up zoom function from max wait/walk time
  // mapViews.changeZoom = function () {
  //   $('#wait-time').on('change', 'input[type="radio"]', function() {
  //     var zoom = parseInt($(this).val());
  //     googleMapping.map.setZoom(zoom);
  //     //keeps track of the current zoom
  //     filterData.zoom = zoom;
  //   });
  // };

  //takes map markers and puts on map
  mapViews.setMapOnAll = function(map) {
    mapViews.allMarkers.forEach(function(object) {
      object.setMap(map);
    });
  };

  //clears map markers - markers stored
  mapViews.clearMapMarkers = function() {
    mapViews.setMapOnAll(null);
  };

  //clears map markers - not stored
  mapViews.deleteMapMarkers = function() {
    mapViews.clearMapMarkers();
    mapViews.allMarkers = [];
  };

  //click handler for hamburger
  mapViews.setUpHamburger = function() {
    $('.icon-menu').on('click', function(event) {
      var $this = $(this);
      var $ul = $(this).parents('nav').find('ul');
      $ul.slideToggle();
    });
  };

  //put click handlers in place
  mapViews.initializePage = function() {
    mapViews.changeZoom();
    mapViews.setUpHamburger();
  };

  module.mapViews = mapViews;
  mapViews.initializePage();
})(window);

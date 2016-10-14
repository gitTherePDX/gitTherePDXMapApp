'use strict';

(function(module) {
//contains methods, data and api calls for google maps

  var googleMapping = {};

  googleMapping.map;
  googleMapping.currentLocation = {};
  googleMapping.userLocationInput = {};
  googleMapping.locations = [];
  googleMapping.locationsParsed = [];

  //TODO: because of SSL requirements this method can not be used on heroku
  //      method gets current location of device for app use
  //      find work around in future
  // googleMapping.getCurrentLocation = function(callbackFunction) {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(function(position) {
  //       googleMapping.currentLocation = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude
  //       };
  //       //uberObject.updateInfo(googleMapping.currentLocation);
  //       //lyftObject.updateInfo(googleMapping.currentLocation);
  //       googleMapping.map = googleMapping.createMap(filterData.zoom, googleMapping.currentLocation);
  //       callbackFunction(googleMapping.map);
  //     }, function() {
  //       googleMapping.handleLocationError(true, mapViews.map, mapViews.map.getCenter());
  //     });
  //   } else {
  //     //Browser doesn't support Geolocation :(
  //     googleMapping.currentLocation = {lat: 45.5231, lng: -122.6765};
  //     googleMapping.map = googleMapping.createMap(filterData.zoom, googleMapping.currentLocation);
  //     callbackFunction(googleMapping.map);
  //     handleLocationError(false, mapViews.map, mapViews.map.getCenter());
  //   };
  // };

  //gets location data based on input field
  googleMapping.getUpdatedLocation = function(selectionObject) {
    $('.biketown-map').empty();
    etaObject.buildCanvas();
    if (0 < selectionObject.address.length) {
      new google.maps.Geocoder()
      .geocode({address: selectionObject.address}, function(results) {
        googleMapping.currentLocation = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        };
        if (filterData.Uber) {
          uberObject.getInfo(etaObject.drawLogo, googleMapping.currentLocation);
        }
        if (filterData.Lyft) {
          lyftObject.getInfo(etaObject.drawLogo,googleMapping.currentLocation);
        }
        if (filterData.Biketown) {
          biketownObject.getStationInfo(mapViews.createMarkers,etaObject.drawLogo);
        };
      });

    //TODO: find host that does not have SSL issues
    //Navigator geolocation will be deprecated until
    //ssl encryption can be used for this app
    // } else if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(function(position) {
    //     googleMapping.currentLocation = {
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude
    //     };
    //     if (filterData.Uber) {
    //       uberObject.getInfo(etaObject.drawLogo, googleMapping.currentLocation);
    //     }
    //     if (filterData.Lyft) {
    //       lyftObject.getInfo(etaObject.drawLogo,googleMapping.currentLocation);
    //     }
    //     if (filterData.Biketown) {
    //       biketownObject.getStationInfo(mapViews.createMarkers);
    //     };
    //         //uberObject.updateInfo(googleMapping.currentLocation);
    //         //lyftObject.updateInfo(googleMapping.currentLocation);
    //   }, function() {
    //     googleMapping.handleLocationError(true, googleMapping.map, googleMapping.map.getCenter());
    //   });


    } else {
      //update with Pioneer Courhouse square location as default
      googleMapping.currentLocation = {lat: 45.5189, lng: -122.6793};
      if (filterData.Uber) {
        uberObject.getInfo(etaObject.drawLogo, googleMapping.currentLocation);
      }
      if (filterData.Lyft) {
        lyftObject.getInfo(etaObject.drawLogo,googleMapping.currentLocation);
      }
      if (filterData.Biketown) {
        biketownObject.getStationInfo(mapViews.createMarkers);
      };
      handleLocationError(false, googleMapping.map, googleMapping.map.getCenter());
    };
  };

  googleMapping.handleLocationError = function(browserHasGeolocation, map, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation :('
    );
  };

  //call googles api to parse address strings into lat and lng data to be mapped to the actual map
  googleMapping.parseAddressString = function() {
    googleMapping.locations.forEach(function(addressString) {
      new google.maps.Geocoder()
      .geocode({address: addressString}, function(results) {
        googleMapping.locationsParsed.push({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        });
      });
    });
  };

  //creates a google map object
  googleMapping.createMap = function(zoomVal, latLng) {
    var map = new google.maps.Map(document.querySelectorAll('.biketown-map')[0], {
      zoom: zoomVal,
      center: latLng
    });
    return map;
  };

  module.googleMapping = googleMapping;
})(window);

'use strict';

(function(module) {

  var googleMapping = {};

  googleMapping.map;
  googleMapping.currentLocation = {};
  googleMapping.userLocationInput = {};
  googleMapping.locations = [];
  googleMapping.locationsParsed = [];
  //placeholder until we can import the data
  googleMapping.locationsAddresses = [
    '620 SW 5th Ave, Portland, OR 97204',
    '300-398 SW Market St, Portland, OR 97201',
    '1800 SW Montgomery St, Portland, OR 97201',
    '1028 SE Water Ave, Portland, OR 97214',
    '1202-1210 Southeast Hawthorne Boulevard, Portland'
  ];

  //placeholder of lat/lng of above addresses...again for testing map api
  googleMapping.locationsAddressesLatLng = [
    // {lat:45.5190046,lng:-122.67688190000001},
    // {lat:45.5122623,lng:-122.67883110000002},
    // {lat:45.5115165,lng:-122.68207330000001},
    // {lat:45.5153234,lng:-122.6655189},
    // {lat:45.5122046,lng:-122.65358530000003}
  ];

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

  googleMapping.getUpdatedLocation = function(selectionObject) {
    $('.bike-map').empty();
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
          biketownObject.getStationInfo(mapViews.createMarkers);
        };
        //update with current location
        //uberObject.updateInfo(googleMapping.currentLocation);
        //lyftObject.updateInfo(googleMapping.currentLocation);
      });
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        googleMapping.currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        if (filterData.Uber) {
          uberObject.getInfo(etaObject.drawLogo, googleMapping.currentLocation);
        }
        if (filterData.Lyft) {
          lyftObject.getInfo(etaObject.drawLogo,googleMapping.currentLocation);
        }
        if (filterData.Biketown) {
          biketownObject.getStationInfo(mapViews.createMarkers);
        };
            //uberObject.updateInfo(googleMapping.currentLocation);
            //lyftObject.updateInfo(googleMapping.currentLocation);
      }); //function() {
      //   googleMapping.handleLocationError(true, mapViews.map, mapViews.map.getCenter());
      // });


    } else {
      //update with current location
      googleMapping.currentLocation = {lat: 45.5231, lng: -122.6765};
      if (filterData.Uber) {
        uberObject.getInfo(etaObject.drawLogo, googleMapping.currentLocation);
      }
      if (filterData.Lyft) {
        lyftObject.getInfo(etaObject.drawLogo,googleMapping.currentLocation);
      }
      if (filterData.Biketown) {
        biketownObject.getStationInfo(mapViews.createMarkers);
      };
      //handleLocationError(false, mapViews.map, mapViews.map.getCenter());
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

  googleMapping.createMap = function(zoomVal, latLng) {
    var map = new google.maps.Map(document.querySelectorAll('.bike-map')[0], {
      zoom: zoomVal,
      center: latLng
    });
    return map;
  };

  // googleMapping.initMap = function() {
  //   googleMapping.getCurrentLocation(mapViews.setMapOnAll);
  //   //firstFunction(, secondFunction);
  // };

  module.googleMapping = googleMapping;
})(window);

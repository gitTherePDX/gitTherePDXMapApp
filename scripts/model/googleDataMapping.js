'use strict';

(function(module) {

  var googleMapping = {};

  googleMapping.locations = [];
  googleMapping.locationsParsed = [];
  //placeholder until we can import the data
  googleMapping.locationsAddresses = [
    '620 SW 5th Ave, Portland, OR 97204',
    '300-398 SW Market St, Portland, OR 97201',
    '1800 SW Montgomery St, Portland, OR 97201',
    '1028 SE Water Ave, Portland, OR 97214'
  ];

  //placeholder of lat/lng of above addresses...again for testing map api
  googleMapping.locationsAddressesLatLng = [
    {lat:45.5190046,lng:-122.67688190000001},
    {lat:45.5122623,lng:-122.67883110000002},
    {lat:45.5115165,lng:-122.68207330000001},
    {lat:45.5153234,lng:-122.6655189}
  ];

  googleMapping.addLocation = function(domNode) {
    //placeholder
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

  googleMapping.initMap = function() {
    var map = new google.maps.Map(document.querySelectorAll('.bike-map')[0], {
      center: {lat: 45.5231, lng: -122.6765},
      zoom: 13
    });
  };

  module.googleMapping = googleMapping;
  googleMapping.initMap();
})(window);

'use strict';

(function(module) {
  //all the biketown api data

  var biketownObject = {};

  biketownObject.allStations = [];

  biketownObject.getOpenData = function() {
    $.ajax('http://biketownpdx.socialbicycles.com/opendata/gbfs.json', {
      method: 'GET',
      success: function(data) {
        console.log(data);
        var bikeTownData = data;
        var myArray = bikeTownData.data.en.feeds;
      },
      error: function() {
        console.log('whoops, there seems to be an error');
      }
    });
  };

  //station information data - latitude & longitude
  biketownObject.getStationInfo = function(firstcallback) {
    $.ajax({
      url: '/biketown/',
      method: 'GET',
      success: function(data) {
        console.log('BIKETOWN!');
        console.log(data);
        biketownObject.allStations = data.data.stations;
        googleMapping.map = googleMapping.createMap(filterData.zoom, googleMapping.currentLocation);
        firstcallback();
        //should take a callback to map out lat/lng
      },
      error: function() {
        console.log('whoops, there seems to be an error');
        $.ajax({
          url: 'data/biketownlocationbackup.json',
          method: 'GET',
          success: function(data) {
            biketownObject.allStations = data.data.stations;
            console.log('got data from backup json');
            googleMapping.map = googleMapping.createMap(filterData.zoom, googleMapping.currentLocation);
            firstcallback();
          }
        });
      }
    });
  };

  //system information data - number of bikes at a stations
  biketownObject.getStationStatus = function() {
    $.ajax('http://biketownpdx.socialbicycles.com/opendata/station_status.json',{
      method: 'GET',
      success: function(data) {
        console.log(data);
        var bikeTownData = data;
        var myArray = bikeTownData.data.stations;
        myArray.forEach(listElements);

        function listElements(el, index, array) {
          for (var key in el) {
            console.log(key, el[key]);
          }
        }
      },
      error: function() {
        console.log('whoops, there seems to be an error');
      }
    });
  };

  module.biketownObject = biketownObject;
})(window);

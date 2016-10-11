'use strict';

//all the biketown api data
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

//station information data - latitude & longitude
$.ajax('http://biketownpdx.socialbicycles.com/opendata/station_information.json',{
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

//system information data - number of bikes at a stations
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
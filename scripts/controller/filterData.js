'use strict';
//sets up form submit

//TODO: put in an iife and expose to global scope

var filterData = {
  address: '',
  Biketown: false,
  Lyft: false,
  Uber: false,
  zoom: 17,
  LyftOAuth: ' 1',
};

//click handler for the transportation options
filterData.getTransportationOption = function() {
  $('form').on('submit', function(event){
    event.preventDefault();
    var $this = $(this);
    $this.find('input[type="checkbox"]:checked').each(function() {
      filterData[$(this).attr('value')] = true;
    });
    $this.find('input[type="checkbox"]:not(:checked)').each(function(){
      filterData[$(this).attr('value')] = false;
    });
    filterData.address = $('#address').val();
    googleMapping.getUpdatedLocation(filterData);
  });
};

//TODO: wire up click handlers for max wait/walk times
// filterData.getZoom = function() {
//   $('form').on('submit', function(event){
//
//   });
// };
//filterData.getZoom();

filterData.getTransportationOption();

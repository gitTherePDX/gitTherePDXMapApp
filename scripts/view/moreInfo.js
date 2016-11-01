(function (module){

  //click handlers for the pop-ups

  var moreInfo = {};

  //click handler attach eta to span in uber pop-up div
  moreInfo.uberEta = function(eta) {
    $('#uber-eta').empty();
    $('#uber-eta').append(eta);
  };

  //click handler attach eta to span in lyft pop-up div
  moreInfo.lyftEta = function(eta) {
    $('#lyft-eta').empty();
    $('#lyft-eta').append(eta);
  };

  //click handler events for the results logos - uses alt value of img
  //alts have a purpose in an img tag. Even if you're not really using it for anything
  //if you need to store data on an element for use in your scripts you should use a
  //data attribute.
  moreInfo.showMoreInfo = function() {
    $('.results-logo').on('click', function() {
      var alt = $(this).attr('alt');
      $('#more-info > div[class|=' + alt + ']').show().siblings().hide();

      if (alt === 'biketown') {
        google.maps.event.trigger(googleMapping.map, 'resize');
        googleMapping.map.setCenter(googleMapping.currentLocation);
      }
    });
  };

  moreInfo.showMoreInfo();
  module.moreInfo = moreInfo;
})(window);

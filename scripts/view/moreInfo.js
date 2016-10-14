(function (module){

  var moreInfo = {};

  moreInfo.uberEta = function(eta) {
    $('#uber-eta').empty();
    $('#uber-eta').append(eta);
  };

  moreInfo.lyftEta = function(eta) {
    $('#lyft-eta').empty();
    $('#lyft-eta').append(eta);
    console.log('lyft eta is', eta);
  };

  moreInfo.showMoreInfo = function() {
    $('.results-logo').on('click', function() {
      var alt = $(this).attr('alt');
      $('#more-info > div[class|=' + alt + ']').show().siblings().hide();
      console.log(alt);
      appControl.currOpen = alt;
      if (alt === 'biketown') {
        google.maps.event.trigger(googleMapping.map, 'resize');
        googleMapping.map.setCenter(googleMapping.currentLocation);
      }
    });
  };

  moreInfo.showMoreInfo();
  module.moreInfo = moreInfo;
})(window);

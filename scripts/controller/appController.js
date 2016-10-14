(function(module){
  var appControl = {};

  //no real easy way to persist previously opened more info tab in app window so this is a work around
  appControl.currOpen = '';

  appControl.appReveal = function() {
    $('#about').hide();
    $('#app').show();
    $('#more-info').show();
  };
  module.appControl = appControl;
})(window);

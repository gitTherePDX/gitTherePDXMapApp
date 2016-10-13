(function(module){
  var appControl = {};

  appControl.appReveal = function() {
    $('#about').hide();
    $('#app').show();
  };
  module.appControl = appControl;
})(window);

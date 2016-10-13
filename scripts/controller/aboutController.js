(function(module){

  var aboutControl = {};

  aboutControl.aboutReveal = function() {
    $('#app').hide();
    $('#about').show();
  };
  module.aboutControl = aboutControl;
})(window);

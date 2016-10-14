(function(module){

  var aboutControl = {};

  aboutControl.aboutReveal = function() {
    $('#app').hide();
    $('#more-info').hide();
    $('#about').show();
  };

  module.aboutControl = aboutControl;
})(window);

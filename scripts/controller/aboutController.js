(function(module){
  //controls routing for about page
  
  var aboutControl = {};

  aboutControl.aboutReveal = function() {
    $('#app').hide();
    $('#more-info').hide();
    $('#about').show();
  };

  module.aboutControl = aboutControl;
})(window);

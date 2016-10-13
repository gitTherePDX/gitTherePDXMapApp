(function (module){

  var driverEta = {};

  driverEta.uberEta = function(eta) {
    $('#uber-eta').empty();
    $('#uber-eta').append(eta);
  };

  driverEta.lyftEta = function(eta) {
    $('#lyft-eta').empty();
    $('#lyft-eta').append(eta);
  };
  module.driverEta = driverEta;
})(window);

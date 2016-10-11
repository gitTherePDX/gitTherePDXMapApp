var lyftObject = {};

lyftObject.eta = [];

lyftObject.attachEta = function() {
  var lyft = lyftObject.eta.filter(function(car){
    return car.display_name === 'Lyft';
  });
  var eta = lyft[0].eta_seconds;
  console.log('lyft eta ', eta);
};

lyftObject.callApi = function() {
  var longitude = '-122.6765';
  var latitude = '45.5231';
  var ajaxQuery = {
    url: 'data/lyft.json',
    type: 'GET',
    success: function(data, textStatus, jqXHR) {
      lyftObject.eta = data;
      // console.log(lyftObject.eta);
      lyftObject.attachEta();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      //console.log(jqXHR, textStatus, errorThrown);
    }
  };
  $.ajax(ajaxQuery);
};

lyftObject.callApi();
// console.log(lyftObject.eta);

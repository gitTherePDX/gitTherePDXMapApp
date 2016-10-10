var lyftApi = {};

lyftApi.eta = [];

lyftApi.callApi = function() {
  var longitude = '-122.6765';
  var latitude = '45.5231';
  var ajaxQuery = {
    url: 'data/lyft.json',
    type: 'GET',
    success: function(data, textStatus, jqXHR) {
      lyftApi.eta = data;
      console.log(lyftApi.eta);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    }
  };
  $.ajax(ajaxQuery);
};
lyftApi.callApi();
console.log(lyftApi.eta);

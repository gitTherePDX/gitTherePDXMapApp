var lyftApi = {};

lyftApi.eta = [];

lyftApi.callApi = function(queryString, bearerToken) {
  $.get('https://api.lyft.com/v1/eta' + queryString, {headers: {Authorization: 'Bearer ' + bearerToken}}).done(function(data){
    lyft.Api = data;
  });
};

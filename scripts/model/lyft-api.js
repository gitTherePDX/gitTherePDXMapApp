var lyftApi = {};

lyftApi.eta = [];

lyftApi.callApi = function(queryString, bearerToken) {
  $.ajax({
    url: 'https://api.lyft.com/v1/eta?lat=45.5170414&lng=-122.6767154',
    method: 'GET',
    dataType: 'json',
    headers: {
      'authorization': 'Bearer gAAAAABX-8BTUn98TzBZFffvp_Yv7Fw6ELG9uGuTi1SWx5_X0EMfl5X6d9MulK32OzGFx3yIP_7ThL_29-a1n8ExnXOd7FhWCpRNXD-kaYcARZIr9JVXJny5cLqEJZdtOPdFaA2au0X58ibjhWvQQxfVkJqsSZ-GrAxf2Ev8jxoQD2AlZaVmRg26fWUzeZevoY6zmLWEOtEcAS1SZOQNHcgUkkvdYFt0vQ=='
    }
  }).done(function(data){
    console.log(data.eta_estimates);
    data.eta_estimates = lyftApi.eta;
  });
};
lyftApi.callApi();
console.log(lyftApi.eta);

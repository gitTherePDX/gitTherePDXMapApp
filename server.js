'use strict';

var express = require('express'),
  requestProxy = require('express-request-proxy'),
  port = process.env.PORT || 3000,
  app = express();

function proxyUber(request, response) {
  console.log('Routing Uber request for ');
  console.log('the request is ', request.params);
  console.log('the response is ', response.params);
  (requestProxy({
    url: 'https://api.uber.com/v1/estimates/time',
    query: {
      start_latitude: request.params[0].split('/')[0],
      start_longitude: request.params[0].split('/')[1]
    },
    headers: {
      Authorization: 'Token ' + process.env.UBER_TOKEN
    }
  }))(request, response);
};

//app.get('/uber/*', proxyUber);

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', {root: '.'});
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});

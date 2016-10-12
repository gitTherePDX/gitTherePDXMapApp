'use strict';
var superagent = require('superagent');
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

function proxyLyft(request, response) {
  var bearerToken;
  // console.log('Routing Lyft request for ');
  // console.log('the requst is ', request.params);
  // console.log('the response is ', response.params);
  process.env.TOKENWHATEVER='hello';
  console.log(process.env.BEARER_TOKEN);
  (requestProxy({
    url: 'https://api.lyft.com/v1/eta',
    query: {
      lat: request.params[0].split('/')[0],
      lng: request.params[0].split('/')[1]
    },
    headers: {
      Authorization: 'Bearer ' + process.env.BEARER_TOKEN
    }
  }))(request, response);
}

function proxyLyftGetAuth(request, response) {
  console.log(request.params);
  superagent
    .post('https://api.lyft.com/oauth/token')
    .send({grant_type: 'client_credentials'})
    .set('authorization', 'Basic ' + process.env.LYFT_TOKEN)
    .set('content-type', 'application/json')
    .end(function(err, res){
      if (err) {
        console.log('error');
      } else {
        console.log('success');
        

      }
    });
  console.log(process.env.BEARER_TOKEN);
  response.json();
}

//   (requestProxy({
//     "url": "https://api.lyft.com/oauth/token",
//     "headers": {
//       "authorization": "Basic " + process.env.LYFT_TOKEN,
//       "content-type": "application/json"
//     },
//     "processData": false,
//     "data": "{\"grant_type\": \"client_credentials\", \"scope\": \"public\"}"
//   }))(request, response);
//
// }

app.get('/uber/*', proxyUber);

app.get('/lyft/*', proxyLyft);

app.post('/tokenlyft/*', proxyLyftGetAuth);

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', {root: '.'});
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});

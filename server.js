'use strict';

//RESTful api call for lyft to get new OAuth
var superagent = require('superagent');
//RESTful api call for uber & lyft & biketown
var express = require('express'),
  requestProxy = require('express-request-proxy'),
  port = process.env.PORT || 3000,
  app = express();

//RESTful api call for uber
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

//RESTful api call for lyft if valid OAuth token
function proxyLyft(request, response) {
  var bearerToken;
  // console.log('Routing Lyft request for ');
  console.log('the requst is ', request.params);
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
      authorization: 'Bearer ' + request.params[0].split('/')[2]
    }
  }))(request, response);
}

//RESTful api call for new lyft OAuth token
function proxyLyftGetAuth(request, response) {
  console.log(request.params);
  //get new OAuth token
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
        var token = res.body.access_token;
        //new api request
        superagent
          .get('https://api.lyft.com/v1/eta')
          .query({lat:request.params[0].split('/')[0]})
          .query({lng:request.params[0].split('/')[1]})
          .set('authorization','Bearer ' + token)
          .end(function(err, resp) {
            if (err) {
              console.log('error');
              response.end();
            } else {
              console.log('further success');
              console.log(resp);
              response.json(resp);
            };
          }
        );
      };
    });
};

//RESTful api call for biketown
function proxyBikeTown(request, response) {
  console.log(request.params);
  (requestProxy({
    url: 'http://biketownpdx.socialbicycles.com/opendata/station_information.json'
  }))(request, response);
};

//routes
app.get('/uber/*', proxyUber);

app.get('/lyft/*', proxyLyft);

app.post('/tokenlyft/*', proxyLyftGetAuth);

app.get('/biketown/*', proxyBikeTown);

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', {root: '.'});
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});

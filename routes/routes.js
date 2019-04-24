const express = require('express');
const config = require('../config/development');
var request = require('request');

const router = express.Router();

router.post('/token', (req, res) => {
  console.log('/token');
  var headers = {
    // 'Authorization': 'Basic MUQweXBmQmVBZnR4MWlaZ1FnNllRZ1pPTjp3UjdhWmpBZ1lZYmxzd0xiclpVQm90ZmhvSWRGb3poMldXbnV3bDh3SXZaUDhKbEpCZw==',
    'Authorization': `Basic ${config.authToken}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  const url = config.twitter_tokenUrl;
  console.log('url: ', url);
  var options = {
      url,
      method: 'POST',
      headers: headers,
      body: 'grant_type=client_credentials'
  }

  request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          // Print out the response body
          console.log('access_token', body);
          res.send(body);
      } else {
          res.json({msg: 'Failed to generate the token.'})
      }
  })

});

router.get('/tweets', (req, res) => {
  console.log('/tweets');
  var headers = {
      'Authorization': 'Bearer ' + req.header('Authorization')
  }
  console.log('params', req.query);
  let query = '';
  console.log('req.query', req.query);
  console.log('req.params', req.params);
  Object.keys(req.query).forEach(function(key) {
      query += key + '=' + req.query[key] + '&';
  });

  const url = `${config.twitter_getTweetsUrl}${query}`;
  console.log('url', query);
  var options = {
      url,
      method: 'GET',
      headers: headers
  }

  request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          res.send(body);
      } else {
          console.log('error: ', error);
          res.status(500).send(error);
      }
  })

});

router.get('/tweets/:id', (req, res) => {
  console.log('/tweets/:id');
  var headers = {
      'Authorization': 'Bearer ' + req.header('Authorization')
  }
  
  const id = req.param('id');
  const url = `${config.twitter_getTweetByIdUrl}${id}`
  console.log('url: ', url);
  var options = {
      url,
      method: 'GET',
      headers: headers
  }

  request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          res.send(body);
      } else {
          console.log(`Tweet with id ${id} was not found!`);
          console.log('error: ', error);
          res.send(response.statusCode);
      }
  })

});
 
router.get('/users/:id', (req, res) => {
  console.log('/user/:id');
  var headers = {
      'Authorization': 'Bearer ' + req.header('Authorization')
  }
  const id = req.param('id');
  const url = `${config.twitter_getUserByIdUrl}${id}`;
  console.log('url: ', url);
  var options = {
      url,
      method: 'GET',
      headers: headers
  }

  request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          res.send(body);
      } else {
          res.send(response.statusCode);
      }
  })

});

router.post('/favorites', (req, res) => {
  console.log('/favorite');
  const headers = {
      'Authorization': 'Bearer ' + req.header('Authorization')
  }
  const id = req.param('id');
  const url = config.twitter_postFavoriteUrl;
  console.log('url: ', url);
  var options = {
      url,
      method: 'POST',
      headers: headers,
      params: {id: id}
  }

  request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          res.send(body);
      } else {
          res.json({msg: 'Failed to generate the token.'})
      }
  })
  
});


exports.routes = router;
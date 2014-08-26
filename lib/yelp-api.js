'use strict';

var OAuth = require('OAuth');
var querystring = require('querystring');

// Wrapper for the OAuth 1.0 consumer used to make authenticated called to the Yelp API.
var Client = function(options) {

  if(!options) { options = {}; }

  this.apiHost = 'http://api.yelp.com';
  this.apiPath = { search: '/v2/search/?', business:'/v2/business/' };

  var token = options.token || process.env.TOKEN;
  var tokenSecret = options.tokenSecret || process.env.TOKEN_SECRET;

  var oauth = new OAuth.OAuth
  (
    options.requestUrl || null,
    options.accessUrl || null,
    options.consumerKey || process.env.CONSUMER_KEY,
    options.consumerSecret || process.env.CONSUMER_SECRET,
    options.version || '1.0',
    options.authorizeCallback || null,
    options.signatureMethod || 'HMAC-SHA1',
    options.nonceSize || null,
    options.customHeaders || null
  );
};

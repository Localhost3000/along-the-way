'use strict';

/*
  http://www.yelp.com/developers/documentation/v2/
  https://github.com/ciaranj/node-oauth
  http://nodejs.org/api/querystring.html
*/

var OAuth = require('oauth');
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

    this.get = function get(url, callback) {
    return oauth.get(
      url,
      token,
      tokenSecret,
      callback
    );
  };

    this.signRequest = function signRequest(url, callback) {
    return oauth.signUrl(url, token, tokenSecret);
  };
};

Client.prototype.signSearchRequest = function(location, parameters, callback) {
  parameters.location = location;
  var url = this.apiHost + this.apiPath.search + querystring.stringify(parameters);

  return this.signRequest(url);
};

Client.prototype.signBusinessRequest = function(id, callback) {
  var url = this.apiHost + this.apiPath.business + id;

  return this.signRequest(url, callback);
};

 // Refer to Yelp documentation for search parameters on the below methods

// Must provide a location, other search parameters are optional. Location can be
// a neighborhood, address or city.
// Example useage:  yelp.search('Seattle', { term: 'food',}, callback);
Client.prototype.searchLocation = function(location, parameters, callback) {
    if(!location || (typeof location !== 'string')) {
        return callback('Must provide a location for the search API.');
    }

    if(!parameters) { parameters = {}; }
    parameters.location = location;

    var url = this.apiHost + this.apiPath.search + querystring.stringify(parameters);
    return this.get(url, callback);
};

// Must provide longitude and latitude, other search parameters are optional.
// Example useage:  yelp.search('Seattle', { term: 'food'}, callback);
Client.prototype.searchCoordinates = function(ll, parameters, callback) {
    if(!ll || (typeof location !== 'string')) {
        return callback('Must provide a location for the search API.');
    }

    if(!parameters) { parameters = {}; }
    parameters.ll = ll;

    var url = this.apiHost + this.apiPath.search + querystring.stringify(parameters);
    return this.get(url, callback);
};

// A business ID can be obtained using the search API. Must provide a business ID.
// Example usage: yelp.business('yelp-san-francisco', callback);
Client.prototype.business = function(id, callback) {
  if(!id) { return callback('Must provide an ID for the business API.'); }

  var url = this.apiHost + this.apiPath.business + id;
  return this.get(url, callback);
};

module.exports = Client;
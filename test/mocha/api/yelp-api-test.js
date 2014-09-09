'use strict';

var expect = require('chai').expect;
var assert = require('chai').assert;
var Client = require('../../../lib/yelp-api.js');


describe('OAuth client', function() {
  var client;

  beforeEach(function() {
    client = new Client();
  });

  describe('Constructor', function() {
    it('should have a host path', function() {
      expect(client.apiHost).to.be.an('string');
    });

    it('should have a search API path', function() {
      expect(client.apiPath.search).to.be.an('string');
    });

    it('should have business API path', function() {
      expect(client.apiPath.business).to.be.a('string');
    });

    it('should have a private OAuth consumer', function() {
      expect(client.oauth).to.be.an('undefined');
    });

    it('should expose an OAuth consumer get function', function() {
      expect(client.get).to.be.a('function');
    });
  });

});

'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var expect = require('chai').expect;

chai.use(chaihttp);

var server = require('../../../server');

describe('Yelp search route', function() {
  console.log('Should look on port ' + server.port);
  it('should be able to get', function(done) {
    chai.request('http://localhost:' + server.port)
    .get('/api/0_0_1/[{"lat":47.6613676,"lon":-122.32989020000002}]/{}')
    .res(function(res) {
	      expect(res).to.have.status(200);
      done();
    });
  });

  it('should return an array', function(done) {
  	chai.request('http://localhost:' + server.port)
    .get('/api/0_0_1/[{"lat":47.6613676,"lon":-122.32989020000002}]/{}')
    .res(function(res) {
	      expect(Array.isArray(res.body)).to.be.true;
      done();
    });
  });

  it('should return Yelp objects within the array', function(done) {
  	chai.request('http://localhost:' + server.port)
    .get('/api/0_0_1/[{"lat":47.6613676,"lon":-122.32989020000002}]/{}')
    .res(function(res) {
	      expect(JSON.parse(res.body[0])).to.have.property('businesses');
      done();
    });
  });
});

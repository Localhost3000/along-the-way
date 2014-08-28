'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var expect = require('chai').expect;

chai.use(chaihttp);

require('../../../server');


describe('Yelp search route', function() {

  it('should be able to get', function(done) {
    chai.request('http://localhost:3000')
      .get('/api/0_0_1/location' )
      .res(function(res) {
        expect(res).to.have.status(200);
      });
      done();
  });

});

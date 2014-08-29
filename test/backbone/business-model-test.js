'use strict';

var chai = require('chai');
var Backbone = require('backbone');
var sinon = require('sinon');
var expect = chai.expect;

var Business = require('../../app/js/models/business-model');

describe('Business Model', function() {
  var business;

  // Sample response: http://www.yelp.com/developers/documentation/v2/search_api
  var yelpResponse = {
      name: 'Yelp',

      location: {
        display_address: [
            '140 New Montgomery St',
            '(b/t Natoma St & Minna St)',
            'SOMA',
            'San Francisco, CA 94105'
          ]
      },

      rating: 1
  };

  before(function(done) {
    this.mock = sinon.mock(Backbone);
    business = new Business();
    done();
  });

  it('Should be a backbone model', function(done) {
    expect(business).to.be.an.instanceof(Backbone.Model);
    done();
  });

  it('Should be able to parse a Yelp business object', function(done) {
    business.parse(yelpResponse);
    done();
  });

  after(function() {
    this.mock.verify();
  });
});

'use strict';

var chai = require('chai');
var Backbone = require('backbone');
var sinon = require('sinon');
var expect = chai.expect;

var BusinessCollection = require('../../app/js/collections/business-collection');

describe('Business Collection', function() {

  // Sample response: http://www.yelp.com/developers/documentation/v2/search_api
  var yelpResponse =
    {
      businesses: [
        {
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
        },

        {
          name: 'Another Business',
          location: {
            display_address: [
            '140 New Montgomery St',
            '(Natoma St & Minna St)',
            'SOMA',
            'San Francisco, CA 94105'
            ]
          },
          rating: 1
        }
      ]
    };

  before(function(done) {
    this.mock = sinon.mock(Backbone);

    this.businessCollection = new BusinessCollection();

    done();
  });

  it('should be a backbone collection', function(done) {
    expect(this.businessCollection).to.be.an.instanceof(Backbone.Collection);
    done();
  });

  it('should have a location on creation', function(done) {
    expect(this.businessCollection.location).to.exist;
    done();
  });

  it('should have params on creation', function(done) {
    expect(this.businessCollection.params).to.exist;
    done();
  });

  it('should hit the Yelp endpoint on search', function(done) {
    var url = this.businessCollection.url();
    this.mock.expects('ajax').withArgs(sinon.match({type: 'GET', url: url}));
    this.businessCollection.search({});
    done();
  });

  it('should be able to parse a Yelp search response', function(done) {
    var results = this.businessCollection.parse(JSON.stringify(yelpResponse));
    expect(results.length).to.equal(1);
    done();
  });

});

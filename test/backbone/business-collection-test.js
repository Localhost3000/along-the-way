'use strict';
/* jshint expr:true */

var chai = require('chai');
var Backbone = require('backbone');
var sinon = require('sinon');
var expect = chai.expect;

var BusinessCollection = require('../../app/js/collections/business-collection');

describe('Business Collection', function() {

  // Sample response: http://www.yelp.com/developers/documentation/v2/search_api
  var yelpResponse = [
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
    }
  ];

  var masterResponse = [];
  masterResponse[0] = JSON.stringify(yelpResponse);

  before(function(done) {
    this.mock = sinon.mock(Backbone);

    this.businessCollection = new BusinessCollection();

    done();
  });

  it('should be a backbone collection', function(done) {
    expect(this.businessCollection).to.be.an.instanceof(Backbone.Collection);
    done();
  });

  it('should have params on creation', function(done) {
    expect(this.businessCollection.params).to.exist;
    done();
  });

  it('should have a default search radius', function(done) {
    console.log('COLLECTION PARAMS: ' + JSON.stringify(this.businessCollection.params));
    expect(this.businessCollection.params.radius_filter).to.be.a('number');
    done();
  });

  // it('should be able to parse a Yelp search response', function(done) {
  //   var results = this.businessCollection.parse(masterResponse);
  //   expect(results.length).to.equal(1);
  //   done();
  // });

  it('should hit the Yelp endpoint on search', function(done) {
    var url = this.businessCollection.url();
    this.mock.expects('ajax').withArgs(sinon.match({type: 'GET', url: url}));
    this.businessCollection.search({});
    done();
  });

});

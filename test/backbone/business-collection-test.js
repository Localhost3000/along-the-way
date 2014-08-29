'use strict';

var chai = require('chai');
var Backbone = require('backbone');
var sinon = require('sinon');
var expect = chai.expect;

var BusinessCollection = require('../../app/js/collections/business-collection');

describe('Business Collection', function() {
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

  it('should hit the yelp endpoint on search', function(done) {
    var url = this.businessCollection.url();
    this.mock.expects('ajax').withArgs(sinon.match({type: 'GET', url: url}));
    this.businessCollection.search({});
    done();
  });

});

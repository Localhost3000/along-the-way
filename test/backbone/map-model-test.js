'use strict';

var chai = require('chai');
var Backbone = require('backbone');
var sinon = require('sinon');
var expect = chai.expect;

var MapModel = require('../../app/js/models/map-model');

describe('Map Model', function() {
  var map;

  before(function(done) {
    this.mock = sinon.mock(Backbone);
    map = new MapModel();
    done();
  });

  it('Should be a backbone model', function(done) {
    expect(map).to.be.an.instanceof(Backbone.Model);
    done();
  });

  it('Should have a start attribute', function(done) {
    expect(map.attributes).to.have.property('start');
    done();
  });

  it('Should have an end attribute', function(done) {
    expect(map.attributes).to.have.property('end');
    done();
  });

  after(function() {
    this.mock.verify();
  });
});

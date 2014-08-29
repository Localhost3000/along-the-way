'use strict';

/* jshint expr: true */

var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
var Backbone = require('backbone');

var MapView = require('../../app/js/views/map-view');
var MapModel = require('../../app/js/models/map-model');
var BusinessCollection = require('../../app/js/collections/business-collection');

describe('Backbone Map View', function() {
  before(function(done) {
    sinon.spy(MapView.prototype, 'render');
    sinon.spy(MapView.prototype, 'getDirections');
    sinon.spy(MapView.prototype, 'createMarker');

    this.collection = new BusinessCollection();
    this.mapModel = new MapModel();
    this.mapView = new MapView({ model: this.mapModel, businesses: this.collection} );
    done();
  });

  it('should call render on creation', function(done) {
    expect(MapView.prototype.render.called).to.be.true;
    done();
  });

  it('should call getDirections on creation', function(done) {
    expect(MapView.prototype.getDirections.called).to.be.true;
    done();
  });

  it('should have a map object (duh)', function(done) {
    expect(this.mapView).to.have.property('map');
    expect(this.mapView.map).to.exist;
    done();
  });

  it('should not have a blank $el', function(done) {
    expect(this.mapView.el).to.not.eql('');
    done();
  });

  it('should call createMarker on collection sync', function(done) {
    this.collection.trigger('sync');
    expect(MapView.prototype.createMarker.called).to.be.true;
    done();
  });

  after(function(done) {
    MapView.prototype.render.restore();
    MapView.prototype.getDirections.restore();
    MapView.prototype.createMarker.restore();
    done();
  });
});

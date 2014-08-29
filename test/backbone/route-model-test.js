'use strict';

var chai = require('chai');
var Backbone = require('backbone');
var sinon = require('sinon');
var expect = chai.expect;

var RouteModel = require('../../app/js/models/route-model');

describe('Route Model', function() {
  before(function(done) {
    this.routeModel = new RouteModel();
    done();
  });

  it('Should be a backbone model', function(done) {
    expect(this.routeModel).to.be.an.instanceof(Backbone.Model);
    done();
  });
});

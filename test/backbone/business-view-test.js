'use strict';

/* jshint expr: true */

var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
var Backbone = require('backbone');

var BusinessView = require('../../app/js/views/business-view');

describe('Backbone Business View', function() {
  before(function(done) {
    sinon.spy(BusinessView.prototype, 'render');
    done();
  });

  it('should call render on creation', function(done) {
    this.businessView = new BusinessView({ model: Backbone.Model.extend({}) });
    expect(BusinessView.prototype.render.called).to.be.true;
    done();
  });

  it('should not have a blank $el', function(done) {
    expect(this.businessView.$el).to.not.eql('');
    done();
  });

  after(function(done) {
    BusinessView.prototype.render.restore();
    done();
  });
});

'use strict';
/* jshint expr: true */

var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
var Backbone = require('backbone');

var InitView = require('../../app/js/views/init-view');
var MapModel = require('../../app/js/models/map-model');

describe('Backbone Init View', function() {
	before(function(done) {
		sinon.spy(InitView.prototype, 'render');
		sinon.spy(InitView.prototype, 'getAddress');
		sinon.spy(InitView.prototype, 'search');
		done();
	});

	it('should call render on creation', function() {
		this.mapModel = new MapModel();
		this.initView = new InitView({ model: this.mapModel });
		expect(InitView.prototype.render.called).to.be.true;
	});

	it('should call search on #search clicked', function(done) {
		this.initView.$el.find('#search').trigger('click');
    expect(InitView.prototype.search.called).to.be.true;
    done();
  });

  it('should not have a blank $el', function(done) {
    expect(this.initView.el).to.not.eql('');
    done();
  });

	after(function(done) {
		InitView.prototype.render.restore();
		InitView.prototype.search.restore();
		done();
	});
});

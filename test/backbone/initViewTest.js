/* jshint expr: true */

var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;

var InitView = require('../../app/js/views/init-view');

describe('Backbone\'s init view', function() {
	before(function(done) {
		sinon.spy(InitView.prototype, 'render');
		done();
	});

	it('Should call render on creation', function() {
		this.initView = new InitView({});
		expect(InitView.prototype.render.called).to.be.true;
	});

	after(function(done) {
		InitView.prototype.render.restore();
		done();
	});
});
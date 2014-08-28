'use strict';
// update

var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

// Test: require in a route model?
var MapModel = require('../models/map-model');

module.exports = function() {
	// test: bind an instance to the view
	this.mapModel = new MapModel();
	// end test
	var InitView = require('../views/init-view');
	var initView = new InitView({model: this.mapModel});
	$('#backbone').html(initView.$el);
};
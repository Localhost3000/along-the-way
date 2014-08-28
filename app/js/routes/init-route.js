'use strict';
// update

var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var BusinessCollection = require('../collections/business-collection');

// Test: require in a route model?
var MapModel = require('../models/map-model');

module.exports = function() {
	// test: bind an instance to the view
	this.mapModel = new MapModel();
	this.collection = new BusinessCollection();

	// end test
	var InitView = require('../views/init-view');
	var initView = new InitView({model: this.mapModel, collection: this.collection});
	$('#backbone').html(initView.$el);
};
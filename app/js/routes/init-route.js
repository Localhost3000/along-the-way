'use strict';

var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var BusinessCollection = require('../collections/business-collection');
var MapModel = require('../models/map-model');

module.exports = function() {
	this.mapModel = new MapModel();
	this.collection = new BusinessCollection({
		radius_filter: 500
	});

	var InitView = require('../views/init-view');
	var initView = new InitView({model: this.mapModel, collection: this.collection});
	$('#backbone').html(initView.$el);
};
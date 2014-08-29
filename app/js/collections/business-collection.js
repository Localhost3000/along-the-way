'use strict';

var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var _ = require('../../bower_components/underscore');
var BusinessModel = require('../models/business-model');

var uniqueID = {};

module.exports = Backbone.Collection.extend({

	model: BusinessModel,

	url: function() {
		var URLstring = 'api/0_0_1/' +
			JSON.stringify(this.locations) +
			'/' +
			JSON.stringify(this.params);
		return URLstring;
	},

	initialize: function(params) {
		this.params = params || {radius_filter: 500};
	},

	parse: function(response) {

		var self = this;
		var allBusinesses = [];

		response.forEach(function(location) {
			var businesses = JSON.parse(location).businesses;
			businesses.forEach(function(business) {
				if (uniqueID[business.id]) {
					return;
				}
				if (business.distance > self.params.radius_filter) {
					return;
				}
				uniqueID[business.id] = true;
				allBusinesses.push(business);
			});
		});

		return allBusinesses;
	},

	search: function(latLong) {
		this.locations = latLong;
		this.fetch();
	}
});
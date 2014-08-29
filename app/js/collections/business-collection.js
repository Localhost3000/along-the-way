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
				// Verbose checking for now, but we could combine these two:
				if (uniqueID[business.id]) {
					console.log('Duplicate business! ' + business.name);
					return;
				}
				if (business.distance > self.params.radius_filter) {
					console.log('Yelp distance error! ' + business.name +
						' is ' +
						business.distance +
						' off route, which is more than the max of ' +
						self.params.radius_filter);
					return;
				}
				uniqueID[business.id] = true;
				allBusinesses.push(business);
			});
		});

		console.log('Number of businesses in collection: ' + allBusinesses.length);
		return allBusinesses;
	},

	search: function(latLong) {
		this.locations = latLong;
		this.fetch();
	}
});
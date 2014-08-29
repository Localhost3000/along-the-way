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
		// console.log(URLstring);
		return URLstring;
	},

	initialize: function(params) {
		this.locations = {};
		this.params = params || {radius_filter: 500};
	},

	parse: function(response) {

		var self = this;
		var allBusinesses = [];
		// var coordinateTicker = 0;

		response.forEach(function(location) {
			var businesses = JSON.parse(location).businesses;
			businesses.forEach(function(business) {
				if (uniqueID[business.id]) {
					// console.log('Duplicate business! ' + business.name);
					return;
				}
				if (business.distance > self.params.radius_filter) {
					// console.log('Yelp distance error! ' + business.name +
					// 	' is ' +
					// 	business.distance +
					// 	' off route, which is more than the max of ' +
					// 	self.params.radius_filter);
					return;
				}
				// if (business.location.coordinate) {
				// 	coordinateTicker++;
				// 	console.log('This business has coordinates! ' +
				// 		business.name + ' | ' +
				// 		business.location.coordinate.latitude + ' | ' +
				// 		business.location.coordinate.longitude + ' | ' +
				// 		business.location.display_address);
				// }
				uniqueID[business.id] = true;
				allBusinesses.push(business);
			});
		});

		// console.log('Number of businesses in collection: ' + allBusinesses.length);
		// console.log('Number of businesses with coordates: ' + coordinateTicker);
		return allBusinesses;
	},

	search: function(latLong) {
		this.locations = latLong;
		this.fetch();
	}
});

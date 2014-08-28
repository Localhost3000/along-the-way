'use strict';

var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var _ = require('../../bower_components/underscore');

var BusinessModel = require('../models/business-model');

module.exports = Backbone.Collection.extend({

	model: BusinessModel,

	url: function(location, params) {
		var URLstring = 'api/0_0_1/' +
			JSON.stringify(this.location) +
			'/' +
			JSON.stringify(this.params);
		return URLstring;
	},

	initialize: function(location, params) {
		this.location = location; // No longer necessary, b/c overwritten on search
		this.params = params; // Eventually necessary?
	},

	parse: function(response) {
		/* The data comes in as an array of objects (one for each lat/long point),
		each of which has a "businesses" attribute that holds an array of businesses.
		We parse the businesses out of each object and return a master businesses array.
		*/

		// Bucket for checking duplicate business ID's
		var uniqueID = {};

		// Holds each unique business instance after flattening the response
		var parsedBusinesses = [];

		response.forEach(function(yelpResponse) {
			var businesses = JSON.parse(yelpResponse).businesses;

			businesses.forEach(function(business) {
				// Ignore this business if it's a duplicate
				if(uniqueID[business.id]) { return; }

				uniqueID[business.id] = true;
				parsedBusinesses.push(business);
			});
		});

		return parsedBusinesses;
	},

	search: function(latLongArray) {
		this.location = latLongArray;
		this.fetch();
	}
});

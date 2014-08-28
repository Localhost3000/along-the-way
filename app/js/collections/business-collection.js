'use strict';

var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var uniqueID = {};

var _ = require('../../bower_components/underscore');

var BusinessModel = require('../models/business-model');

module.exports = Backbone.Collection.extend({

	model: BusinessModel,

	url: function() {
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

		var allBusinesses = [];

		var businesses = JSON.parse(response).businesses;

		businesses.forEach(function(business) {
			if (uniqueID[business.id]) { return; }
			uniqueID[business.id] = true;
			allBusinesses.push(business);
		});

		return allBusinesses;
	},

	search: function(latLong) {
		this.location = latLong;
		this.fetch();
	}
});
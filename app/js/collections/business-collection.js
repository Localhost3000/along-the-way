'use strict';

var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var BusinessModel = require('../models/business-model');

module.exports = Backbone.Collection.extend({
	model: BusinessModel,
	url: function(location, params) {
		var URLparams = JSON.stringify(this.params);
		console.log('params in the model: ' + URLparams);
		return 'api/0_0_1/' + this.location + '/' + URLparams;
	},
	initialize: function(location, params) {
		this.location = location;
		this.params = params;
	},
	parse: function(response) {
		// console.log(JSON.parse(response).businesses);
		return JSON.parse(response).businesses;
	}
});
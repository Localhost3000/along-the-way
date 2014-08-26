'use strict';

var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var BusinessModel = require('../models/business-model');

module.exports = Backbone.Collection.extend({
	model: BusinessModel,
	initialize: function() {
		this.url = 'api/0_0_1';
	},
	parse: function(response) {
		// console.log(JSON.parse(response));
		console.log(JSON.parse(response).businesses);
		return response;
	}
});
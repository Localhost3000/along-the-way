'use strict';

var Backbone = require('backbone');
var BusinessModel = Backbone.Model.extend({
	parse: function(data) {
		console.log(data.name);
		this.name = data.name;
		// Add logic for parsing out indiv business characteristics
		/*
		data.name
		*/
	}
});
module.exports = BusinessModel;

// What kind of data do we want? Category, location...
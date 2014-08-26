var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

// var BusinessModel = require('../models/business-model');
// var businessModel = new BusinessModel();

module.exports = Backbone.Collection.extend({
	initialize: function(models, url) {
		this.models = models;
		this.url = url;
	}
});


// first arg, models; second arg, url
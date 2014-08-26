var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var MapView = Backbone.View.extend({
	tagName: 'div',
	initialize: function() {
		this.render();
	},
	render: function() {
		// Add logic for finding current location
		// If current location exists, set #start to it; otherwise, leave a placeholder
		var template = require('../templates/mapTemplate.hbs');
		var data = this.model.attributes;
		this.$el.html(template(data));
		return this;
	},
});

module.exports = MapView;
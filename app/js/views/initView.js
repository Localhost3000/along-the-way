var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var InitView = Backbone.View.extend({
	tagName: 'div',
	initialize: function() {
		this.render();
	},
	render: function() {
		// Add logic for finding current location
		// If current location exists, set #start to it; otherwise, leave a placeholder
		var template = require('../templates/initTemplate.hbs');
		this.$el.html(template());
		return this;
	},
	events: {
		'click #search': 'search'
	},
	search: function(e) {
		e.preventDefault(); // Otherwise the page will reload!
		var start = this.$el.closest('div').find('#start').val();
		var destination = this.$el.closest('div').find('#destination').val();
		console.log('Start: ' + start + ' | Finish: ' + destination);
		// We'll need to manipulate values into a string for Google API
		// Then we'll need to Adam's API wrapper with string
	}
});

module.exports = InitView;
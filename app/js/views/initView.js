var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var InitView = Backbone.View.extend({
	tagName: 'div',
	initialize: function() {
		this.render();
	},
	render: function() {
		// Add logic for finding current location!

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

		// Grab start and destination from the form
		var start = this.$el.closest('div').find('#start').val();
		var destination = this.$el.closest('div').find('#destination').val();

		// Encode the route as a URL
		var routeUrl = 'start=' + encodeURI(start) + '&dest=' + encodeURI(destination);

		// Navigate to #map with that URL
		Backbone.history.navigate('#map' + '?' + routeUrl, {
			trigger: true
		});
	}
});

module.exports = InitView;
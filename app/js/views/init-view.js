'use strict';

var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var InitView = Backbone.View.extend({
	tagName: 'div',
	initialize: function() {
		this.render();
	},

	render: function() {
		// Add logic for setting current location as default?
		var template = require('../templates/init-template.hbs');
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

		// Pass data into the model (which is owned by the router, and globally visible)
		this.model.set('start', start);
		this.model.set('end', destination);
		console.log('After change, in the model: ' + this.model.get('start'));

		// To do: add Google API call that gets route midpoints
		var BusinessCollection = require('../collections/business-collection');

		// Note that "start" is now unnecessary here; we might still want to pass in
		// the options object on init, though:
		var businessCollection = new BusinessCollection(start, {});

		// This replaces businessCollection.fetch() for now
		businessCollection.search(
		[
			{"lat":47.6228484,"lng":-122.335816},
			{"lat":47.622604,"lng":-122.3371348},
			{"lat":47.6185347,"lng":-122.3371732},
			{"lat":47.6185383,"lng":-122.3384741},
			{"lat":47.61834,"lng":-122.3384572}
		]);

		// Finally, hit up the next view:
		Backbone.history.navigate('#map', {
			trigger: true
		});
	}
});

module.exports = InitView;
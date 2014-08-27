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

		// Pass data into the model (which is owned by the router)
		this.model.set('start', start);
		this.model.set('end', destination);
		console.log('After change, in the model: ' + this.model.get('start'));

		// To do: add Google API call that gets route midpoints
		// Pass them into new BusinessCollection(), instead of start
		var BusinessCollection = require('../collections/business-collection');
		var testCollection = new BusinessCollection(start, {});
		testCollection.fetch(); // Populates businesses asynchronously

		// Finally, hit up the next view:
		Backbone.history.navigate('#map', {
			trigger: true
		});
	}
});

module.exports = InitView;
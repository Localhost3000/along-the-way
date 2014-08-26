var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.Router.extend({
	routes: {
		'': 'init',
		// '/': 'init',
		'map': 'map'
	},
	init: require('./init'),
	map: require('./map')
});
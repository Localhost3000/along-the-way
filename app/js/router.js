var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.Router.extend({
	routes: {
		'': 'init',
		'map': 'map'
	},
	init: require('./routes/init'),
	map: require('./routes/map')
});
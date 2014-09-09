'use strict';

var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.Router.extend({
	routes: {
		'': 'init',
		'home': 'init',
		'map': 'map'
	},
	init: require('./init-route'),
	map: require('./map-route')
});
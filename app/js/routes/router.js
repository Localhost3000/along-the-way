'use strict';

var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.Router.extend({
	routes: {
		'': 'init',
		'map': 'map',
		'destinations': 'businessCollection'
	},
	init: require('./init-route'),
	map: require('./map-route'),
	businessCollection: require('./business-collection-route')
});
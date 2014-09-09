'use strict';

var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

module.exports = function() {
	// Handle people clicking out of map (to business URL) and then back again:
	// Since data no longer available, fail gracefully by redirecting home
	if (!this.mapModel) {
		Backbone.history.navigate('home', {
			trigger: true
		});
	}
	var MapView = require('../views/map-view');
	var mapView = new MapView({model: this.mapModel, businesses: this.collection });
  $('#backbone').html(mapView.el);
};
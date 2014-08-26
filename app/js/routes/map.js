var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var querystring = require('querystring');

var RouteModel = require('../models/routeModel');
var routeModel = new RouteModel();

module.exports = function() {
	// Parse the URL from '?' on
	var params = querystring.parse(window.location.href.split('?')[1]);

	// If we don't have necessary params, redirect to root and return false ...
	if (!(params.hasOwnProperty('start') && params.hasOwnProperty('dest'))) {
		Backbone.history.navigate('/', {
			trigger: true
		});
		return false; // (So we don't continue execution and paint mapView over initView)
	}

	// ... Otherwise, put the variables in a route model
	var start = params.start;
	var destination = params.dest;
	routeModel.set('start', start);
	routeModel.set('destination', destination);

	// And generate the view:
	var MapView = require('../views/mapView');
	var mapView = new MapView({model: routeModel});
	$('#backbone').html(mapView.$el);
};
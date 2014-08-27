'use strict';

var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var querystring = require('querystring');

var RouteModel = require('../models/route-model');
var routeModel = new RouteModel();
var MarkerModel = require('../models/business-model-test');
var Markers = require('../collections/businesses-test');
var markers = new Markers([
  { name: "Test", address: { lat: 42.3352, lng: -122},
  rating: 4.5, categories: "Test Food"},
  { name: "test2", address: {lat: 48, lng: -122 },
  rating: 3, categories: "test drinks"}
  ]);

module.exports = function() { 
	var MapView = require('../views/map-view');
	var mapView = new MapView({model: this.mapModel, businesses: markers});
  $('#backbone').html(mapView.el);
};

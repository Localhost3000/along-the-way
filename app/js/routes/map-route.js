'use strict';
// update

var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var Markers = require('../collections/businesses-test');
var markers = new Markers([
  { name: "Test", address: "Kirkland, WA",
  rating: 4.5, categories: "Test Food"},
  { name: "test2", address: "Federal Way, WA",
  rating: 3, categories: "test drinks"}
  ]);

module.exports = function() {
	var MapView = require('../views/map-view');
	var mapView = new MapView({model: this.mapModel, businesses: this.collection });
  $('#backbone').html(mapView.el);
};

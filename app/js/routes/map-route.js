'use strict';
// update

var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

module.exports = function() {
	var MapView = require('../views/map-view');
	var mapView = new MapView({model: this.mapModel, businesses: this.collection });
  $('#backbone').html(mapView.el);
};

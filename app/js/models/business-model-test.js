"use strict";

var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.Model.extend({
  defaults: {
    name: "Test",
    address: { lat: 42.3352, lng: -122},
    rating: 4.5,
    categories: "Test Food"
  }
});

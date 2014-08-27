"use strict";

var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var Business = require('../models/business-model-test');

module.exports = Backbone.Collection.extend({
  model: Business
});

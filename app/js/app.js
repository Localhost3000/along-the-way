'use strict';

var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var Router = require('./routes/router');
var router = new Router();

Backbone.history.start(); // Allows for fwd and back
Backbone.history.navigate('', {
	trigger: true
}); // This starts the history?

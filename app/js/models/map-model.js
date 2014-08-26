"use strict";

var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.Model.extend({
   
  defaults:{
    zoom: 10,
    start: '511 Boren Ave N Seattle, WA',
    end: '2210 Westlake Ave Seattle, WA'
  }

  
});

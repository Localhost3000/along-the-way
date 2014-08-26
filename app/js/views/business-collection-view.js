'use strict';

var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var BusinessCollection = require('../collections/business-collection');
var Business = require('../models/business-model');
var BusinessView = require('../views/business-view');

module.exports = Backbone.View.extend({
  tagName: 'div',

  initialize: function() {
    this.render();
    this.collection.on('add', this.addOne, this);
    this.collection.on('reset', this.addAll, this);
  },

  addOne: function(business) {
    var businessView = new BusinessView({model: business});
    this.$el.children('#put_here').append(businessView.$el);
  },

  addAll: function() {
    this.$el.children('#put_here').html('');
    this.collection.forEach(this.addOne);
  },

  render: function() {
    var template = require('../templates/business-collection-templates.hbs');
    this.$el.html(template());
    this.addAll();
    return this;
  }
});
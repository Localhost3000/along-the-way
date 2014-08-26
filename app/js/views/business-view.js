var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.View.extend({
  tagName: 'div',
  initialize: function(){
    this.render();
  },
  render: function(){
    var data = this.model.attributes;
    var template = require('../templates/business-model-templates.hbs');
    this.$el.html(template(data));
    return this;
  }
});
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

// Inject the initial Backbone view
var InitView = require('./views/initView');
var initView = new InitView();
$('#backbone').html(initView.$el);
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

// Prepare the home view
module.exports = function() {
	var InitView = require('../views/initView');
	var initView = new InitView();
	$('#backbone').html(initView.$el);
};
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.Collection.extend({
	initialize: function(models, url) {
		this.models = models;
		this.url = url;
	},
	fetch: function() {
		Backbone.$.get('https://www.google.com/', function(data) {
			console.log(data);
		});
	}
});
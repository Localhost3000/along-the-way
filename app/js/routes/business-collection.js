var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var BusinessCollection = require('../collections/business-collection');
var businessCollection = new BusinessCollection();

// Prepare the home view
module.exports = function() {
	var BusinessCollectionView = require('../views/business-collection-view');
	var businessCollectionView = new BusinessCollectionView({
		collection: businessCollection
	});
	$('#backbone').html(businessCollectionView.$el);
};
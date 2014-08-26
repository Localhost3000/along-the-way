'use strict';

var YelpAPI = require('./lib/yelp-api');
var yelpAPI = new YelpAPI({
	// To do: un-hard-code keys for Heroku
	consumerKey: 'LF09pfePJ5IAB7MYcnRkaQ',
	consumerSecret: '8QABPQRA-VZpVtCk6gXmPc-rojg',
	token: 'dPrd7L96SseVYeQGvoyVtf1Dy9n3mmrT',
	tokenSecret: 'W9Br5z5nKGHkScKBik9XljJEAoE',
});

module.exports = function(app) {

	var api = '/api/0_0_1/:location/:options';

	app.get(api, function(req, res) {
		var location = req.params.location || 'Seattle';
		var options = JSON.parse(req.params.options) || {};
		yelpAPI.searchLocation(location, options, function(err, data) {
			return res.status(200).json(data);
		});
	});
};
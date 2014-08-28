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

	var counter = 0;

	app.get(api, function(req, res) {
		// console.log(req.params.location);
		var location = JSON.parse(req.params.location) || [{}];
		var options = JSON.parse(req.params.options) || {"radius_filter": 400};

		// Prepare a string version, to keep Yelp happy:
		var stringLocation = location.lat + ',' + location.lon;

		// Run each point through the Yelp API
		yelpAPI.searchCoordinates(stringLocation, options, function(err, data) {
			if (!err) {
				counter++;
				console.log('numbers of locations registered in Yelp: ' + counter);
				// console.log(JSON.stringify(data));
				return res.status(200).send(JSON.stringify(data));
			} else {
				console.log('Error in the Yelp callback! ' + err);
			}
		});
	});
};
'use strict';

var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var InitView = Backbone.View.extend({
	tagName: 'div',
	initialize: function(options) {
	  this.render();
    this.collection = options.collection;
    var self = this;
    // Try HTML5 geolocation
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var myLatlng = new google.maps.LatLng(position.coords.latitude,
          position.coords.longitude);
        self.getAddress(myLatlng);
        self.model.set("start", myLatlng);
        self.model.set("end", myLatlng);
       }, function() { console.log('success'); });
    } else {
    // Browser doesn't support Geolocation
      console.log('boooooo');
    }
  },

	render: function() {
		var template = require('../templates/init-template.hbs');
		this.$el.html(template());
		return this;
	},

	events: {
		'click #search': 'search'
	},

  getDirections: function(callback){
    var self = this;
    var directionsService = new google.maps.DirectionsService();

    var myTravelMode = this.model.get('travelMode') === "WALKING" ?
      myTravelMode = google.maps.TravelMode.WALKING : google.maps.TravelMode.DRIVING;

    var request = {
      origin: this.model.get('start'),
      destination: this.model.get('end'),
      travelMode: myTravelMode
    };

    directionsService.route(request, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK){

        // One leg for each waypoint
        var legs = response.routes[0].legs[0];

        // Array containing each separate step along a leg
        var steps = legs.steps;

        // Coordinates for Yelp searches
        var routeIntervals = [];

        steps.forEach(function(step) {

          // Grab latitude and longitude from each starting point
          routeIntervals.push({ lat: step.start_location.k, lon: step.start_location.B });

          // If the distance between intervals is greater than 300 meters,
          // calculate an intermediate point
          if(step.distance.value > 300) {
            var lat = (step.start_location.k + step.end_location.k) / 2;
            var lon = (step.start_location.B + step.end_location.B) / 2;
            var midpoint = { lat: lat, lon: lon };

            routeIntervals.push(midpoint);
          }
        });

        callback(routeIntervals);
      }
    });
  },

	search: function(e) {
    e.preventDefault(); // Otherwise the page will reload!
		var self = this;

    if (this.$el.closest('div').find('#destination').val() === '') {
      alert('Enter a destination!');
      return false;
    }

    // Grab start and destination from the form
    var start = this.$el.closest('div').find('#start').val() === '' ?
    this.model.get('start') : this.$el.closest('div').find('#start').val();
    var destination = this.$el.closest('div').find('#destination').val() === '' ?
    this.model.get('end') : this.$el.closest('div').find('#destination').val();

		// Pass data into the model (which is owned by the router, and globally visible)
		this.model.set('start', start);
		this.model.set('end', destination);

		// Fire off the Yelp request
    this.getDirections(function(routeIntervals) {
			self.collection.search(routeIntervals);
		});

		// Finally, hit up the next view:
		Backbone.history.navigate('#map', {
			trigger: true
		});
	},

  getAddress: function(latlng){
    var self = this;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          var address = (results[1].formatted_address);
          self.$el.closest('div').find('#start').val(address);
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  }
});

module.exports = InitView;
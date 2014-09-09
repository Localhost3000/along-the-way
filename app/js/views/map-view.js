"use strict";

var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;


module.exports = Backbone.View.extend({
  tagName: 'div',
  id: 'map-canvas',

  initialize: function(options) {
    this.businesses = options.businesses;
    var mapOptions = {
      zoom: this.model.get('zoom'),
    };

    var map = new google.maps.Map(this.el, mapOptions);
    this.map = map;
    this.getDirections(map);

    this.listenTo(this.businesses, 'sync', this.createMarker);

    this.render();
  },

  getDirections: function(map) {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);

    var mytravelMode = this.model.get('travelMode') === "WALKING" ?
      mytravelMode = google.maps.TravelMode.WALKING : google.maps.TravelMode.DRIVING;

    var request = {
      origin: this.model.get('start'),
      destination: this.model.get('end'),
      travelMode: mytravelMode
    };

    directionsService.route(request, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
    });
    this.render();
  },

  createMarker: function() {

    var self = this,
      geocoder = new google.maps.Geocoder(),
      i = 0,
      delay = 100,
      successCounter = 0;

    var addMarker = function(position, name, url) {
      var marker = new google.maps.Marker({
        map: self.map,
        position: position,
        title: name,
        url: url,
      });

      // Add marker hyperlinks manually:
      google.maps.event.addListener(marker, 'click', function() {
        window.location.href = this.url;
      });
    };

    function recurse() {

      if (self.businesses.models[i].attributes.coordinates) {

        // Yelp available
        addMarker(self.businesses.models[i].attributes.coordinates,
                  self.businesses.models[i].get('name'),
                  self.businesses.models[i].attributes.url);
        if (i++ < self.businesses.length - 1) {
          setTimeout(recurse, delay);
        }
      } else {

        // Geocoder :(
        geocoder.geocode({
          'address': self.businesses.models[i].attributes.address
        }, function(results, status) {
          try {
            if (status === google.maps.GeocoderStatus.OK) {
              addMarker(results[0].geometry.location,
                        self.businesses.models[i].get('name'),
                        self.businesses.models[i].attributes.url);
              if (i++ < self.businesses.length - 1) {
                setTimeout(recurse, delay);
              }
            } else {
              throw status;
            }
          }
          catch(err) {
            // console.log(err);
            setTimeout(recurse, delay);
          }
        });
      }
    }

    recurse(); // Kick off the function for the first time
    this.render();
    return false;
  },

  render: function() {
    $('#map-canvas').replaceWith(this.$el);
    return this;
  }
});
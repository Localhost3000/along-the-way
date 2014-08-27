"use strict";

var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var geocoder = new google.maps.Geocoder();

module.exports = Backbone.View.extend({
  tagName: 'div',
  id: 'map-canvas',

  initialize: function(options){
    this.businesses = options.businesses;
    var mapOptions = {
      zoom: this.model.get('zoom'),
    };
    var map = new google.maps.Map(this.el, mapOptions);

    this.businesses.forEach(function(business){
      geocoder.geocode( { 'address': business.get('address')}, 
        function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location
            });
          } else {
            console.log("Geocode was not successful for the following reason: " + status);
          }
        });
    });


    this.getDirections(map);
    this.render();
  },

  getDirections: function(map){
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);

    var request = {
      origin: this.model.get('start'),
      destination: this.model.get('end'),
      travelMode: google.maps.DirectionsTravelMode.WALKING
    };

    directionsService.route(request, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK){
        directionsDisplay.setDirections(response);

        // One leg for each waypoint
        var legs = response.routes[0].legs[0];

        // Array containing each separate step along a leg
        var steps = legs.steps;

        // Coordinates for Yelp searches
        var routeIntervals = [];

        steps.forEach(function(step) {

          // Grab latitude and longitude from each starting point
          routeIntervals.push({ lat: step.start_location.k, lon: step.start_location.B });

          // If the distance between intervals is greater than 300 meters
          // calculate and intermediate point
          if(step.distance.value > 300) {
            var lat = (step.start_location.k + step.end_location.k) / 2;
            var lon = (step.start_location.B + step.end_location.B) / 2;
            var midpoint = { lat: lat, lon: lon };

            routeIntervals.push(midpoint);
          }
        });
      }
    });

    this.render();
  },

  render: function(){
    $('#backbone').replaceWith(this.$el);
    return this;
  },
});

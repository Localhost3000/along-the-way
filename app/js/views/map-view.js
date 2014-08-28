"use strict";

var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;


module.exports = Backbone.View.extend({
  tagName: 'div',
  id: 'map-canvas',

  initialize: function(options){
    this.businesses = options.businesses;
    var mapOptions = {
      zoom: this.model.get('zoom'),
    };

    var geocoder = new google.maps.Geocoder();
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
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
    });

    this.render();
  },

  render: function(){
    $('#backbone').replaceWith(this.$el);
    return this;
  },
});

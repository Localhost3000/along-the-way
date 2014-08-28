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

    var map = new google.maps.Map(this.el, mapOptions);
    this.map = map;

    // console.log(this.createMarker);

    this.listenTo(this.businesses, 'add', this.createMarker);

    // this.businesses.on('add', this.createMarker);
    // this.businesses.on('add', function() {
    //   console.log('Called!'); // Works!
    // });

    this.getDirections(map);
    this.render();
  },

  getDirections: function(map){
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
    // console.log('Called!');
    var self = this;
    var geocoder = new google.maps.Geocoder();
    this.businesses.forEach(function(business){
      geocoder.geocode( { 'address': business.get('address')},
        function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var marker = new google.maps.Marker({
              map: self.map,
              position: results[0].geometry.location
            });
          } else {
            console.log("Geocode was not successful for the following reason: " + status);
          }
        });
    });
    this.render();
  },

  render: function(){
    $('#backbone').replaceWith(this.$el);
    return this;
  },
});

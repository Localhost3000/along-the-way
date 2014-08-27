"use strict";

var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.View.extend({
  tagName: 'div',
  id: 'map-canvas',

  initialize: function(){
    var mapOptions = {
      zoom: this.model.get('zoom'),
    };
    var map = new google.maps.Map(this.el, mapOptions);

    this.getDirections(map);
    this.render();
    console.log('We\'re in the view, and the model says: ' + this.model.get('start'));
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
      }
    });
    this.render();
  },

  render: function(){
    $('map-canvas').replaceWith(this.$el);
    return this;
  },
});
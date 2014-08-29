"use strict";

var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var async = require('async');


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

    this.businesses.on('sync', this.createMarker, this);

    // this.businesses.on('add', this.createMarker);
    // this.businesses.on('add', function() {
    //   console.log('Called!'); // Works!
    // });

    this.getDirections(map);
    this.render();
  },

  getDirections: function(map){
    var self = this;
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
      this.render();
    });
  },

  createMarker: function() {
    // console.log('Called!');
    var self = this;
    var models = [];
    this.businesses.forEach(function(item){
      models.push(item);
    });
    var service = new google.maps.PlacesService();
    async.eachSeries(models, function(business, callback){
      var request = {
        location = 
      }
      service.radarSearch(request, function(results, status) {
          if (status == google.maps.PlacesServiceStatus.OK) {
            var marker = new google.maps.Marker({
              map: self.map,
              position: results[0].geometry.location
            });
            callback();
          } else {
            console.log("Places status: " + status);
            callback("bad stuff");
          }
        });
    }, function(err){
      if(err) return err;
    });
    this.render();
  },

  render: function(){
    $('#backbone').replaceWith(this.$el);
    return this;
  },
});

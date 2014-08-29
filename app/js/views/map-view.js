"use strict";

var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var async = require('async');


module.exports = Backbone.View.extend({
  tagName: 'div',
  id: 'map-canvas',

  initialize: function(options) {
    var models = [];
    this.businesses = options.businesses;
    var mapOptions = {
      zoom: this.model.get('zoom'),
    };

    var geocoder = new google.maps.Geocoder();
    var map = new google.maps.Map(this.el, mapOptions);
    this.map = map;
    this.models = models;
    this.geocoder = geocoder;
    this.getDirections(map);

    this.businesses.on('add', this.createMarker, this);

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

  createMarker: function(business) {
    var self = this;
    self.models.push(business);
    async.eachSeries(self.models, function(item, callback){
      setTimeout(function(){
        self.geocoder.geocode({
        'address': business.get('address')
      }, function(results, status) {
        var highlight = business.get('name');
          if (status === google.maps.GeocoderStatus.OK) {
            console.log('success!');
            var marker = new google.maps.Marker({
              map: self.map,
              position: results[0].geometry.location,
              title: highlight
            });
            self.models.pop();
          } else {
            self.models.pop();
            console.log('Over geocode limit');
            self.createMarker(business);
          }
        });
      }, 101);
    
    }, function(err){
      if(err) return err;
        console.log('boo');
    });
    // // var i = 0,
    // delay = 200,
    // successCounter = 0;

    // function recurse() {
    //   console.log('i: ' + i);
    //   console.log('Current speed: ' + delay);

    //   /**
    //    * Trial version
    //    *==============
    //    *
    //    *
    //    * Comment it back in (and the traditional one out) if you want to compare!
    //    *
    //    * This version attempts to regulate its own timeout intervals
    //    *
    //    * Otherwise, we need to run at, like, 400 to 600 ms minimum :(
    //    */


    // //   geocoder.geocode({
    // //     'address': self.businesses.models[i].attributes.address
    // //   }, function(results, status) {

    // //     // Move the Geocoder attempt into a try/catch block
    // //     try {

    // //       if (status === google.maps.GeocoderStatus.OK) {
    // //         console.log('success!');
    // //         successCounter++;
    // //         var marker = new google.maps.Marker({
    // //           map: self.map,
    // //           position: results[0].geometry.location
    // //         });

    // //         // If we're successful, increment i and call recurse again
    // //         if (i++ < self.businesses.length - 1) {
    // //           // Successful more than 3 times in a row? Speed up a little
    // //           if (successCounter > 3) {
    // //             delay = (delay > 50 ? delay - 50 : 0);
    // //           }
    // //           setTimeout(recurse, delay); // Call self
    // //         }

    // //       // Error from Google? Throw an exception...
    // //       } else {
    // //         throw status;
    // //       }
    // //     }

    // //     // ... and catch it here
    // //     catch(err) {
    // //       console.log(err);
    // //       successCounter = 0; // duh
    // //       delay = delay + 100; // Slow down execution (twice as aggressively as we ever speed it up)
    // //       setTimeout(recurse, delay); // Call self
    // //     }
    // //   });
    // // }


    // /**
    //  * End self-regulating version
    //  */


    // /**
    //  * Begin normal version
    //  */

    //   delay = 500; // <= Play with this

    //   geocoder.geocode({
    //     'address': self.businesses.models[i].attributes.address
    //   }, function(results, status) {
    //     var highlight = self.businesses.models[i].get('name');
    //     try {
    //       if (status === google.maps.GeocoderStatus.OK) {
    //         console.log('success!');
    //         var marker = new google.maps.Marker({
    //           map: self.map,
    //           position: results[0].geometry.location,
    //           title: highlight
    //         });
    //         if (i++ < self.businesses.length - 1) {
    //           setTimeout(recurse, delay);
    //         }
    //       } else {
    //         throw status;
    //       }
    //     }
    //     catch(err) {
    //       console.log(err);
    //       setTimeout(recurse, delay);
    //     }
    //   });
    // }

    // /**
    //  * End old-fashioned version
    //  */

    // recurse(); // Kick off the function for the first time
    this.render();
  },

  render: function() {
    $('#map-canvas').replaceWith(this.$el);
    return this;
  }
});

'use strict';

var Backbone = require('backbone');
var BusinessModel = Backbone.Model.extend({
	idAttribute: 'id',
	parse: function(data) {
        console.log('data coming into model: ' +
            data.name +
            ' | ' +
            data.location.display_address +
            ' | distance: ' +
            data.distance);

        var hash = {};
        hash.name = data.name;
        hash.id = data.id;
        hash.address = data.location.display_address.join(' ');
        hash.rating = data.rating;

        if (data.location.coordinate && data.location.coordinate !== 'undefined') {
            hash.coordinates = {
                lat: data.location.coordinate.latitude,
                lng: data.location.coordinate.longitude
            };
        }

        if (data.categories && data.categories !== 'undefined') {
        	hash.specificCategory = data.categories[0][0];
        } else {
        	hash.specificCategory = '';
        }
        return hash;
	}
});

module.exports = BusinessModel;
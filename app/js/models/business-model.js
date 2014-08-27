'use strict';

var Backbone = require('backbone');
var BusinessModel = Backbone.Model.extend({
	parse: function(data) {
    this.name = data.name;
    this.address = data.location.display_address.join(' ');
    this.rating = data.rating;
    this.specificCategory = data.categories[0][0];
	}
});
module.exports = BusinessModel;

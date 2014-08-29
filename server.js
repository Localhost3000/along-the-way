'use strict';

// Dependencies
var express = require('express');
var http = require('http');
var bodyparser = require('body-parser');

// Config
var app = express();
app.use(bodyparser.json());
app.use(express.static(__dirname + (process.env.STATIC_DIR || '/build')));

// Routing
require('./expressRoutes')(app);

// Init
var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
    console.log('Lookin legit on port: %d', server.address().port);
});

exports.port = port;
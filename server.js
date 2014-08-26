'use strict';

// Dependencies
var express = require('express');
var http = require('http');
var bodyparser = require('body-parser');

// Config
var app = express();
app.use(bodyparser.json());
app.use(express.static(__dirname + (process.env.STATIC_DIR || '/build')));

// Port
var port = process.env.PORT || 3000;
exports.port = port;

// Routing
require('./routes')(app);

// Init
var server = http.createServer(app);
server.listen(port, function() {
	console.log('Lookin legit on port ' + port);
});
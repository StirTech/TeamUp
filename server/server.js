var express = require('express');
var mongoose = require('mongoose');
mongoose.promise = global.Promise;

var app = express();
var server = require ('http').createServer(app);

var mongoURI = 'mongodb://localhost/teamup';

var port = 3000;

mongoose.connect(mongoURI);

require('./config/middleware.js') (app,express);
require('./config/routes.js') (app,express);

server.listen(port , function () {
	console.log('Server now listening on port ',port );
});

module.exports = app;
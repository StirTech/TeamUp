var express = require('express');
var mongoose = require('mongoose');

var app = express();
var server = require ('http').createServer(app);

var mongoURI = process.env.MONGODB_URI ||'mongodb://localhost/teamup';
mongoose.connect(mongoURI);
db = mongoose.connection;

var port = process.env.PORT || 3000;
db.once('open',function () {
	console.log('mongoDB is open');
});

require('./config/middleware.js') (app,express);
require('./config/routes.js') (app,express);

app.listen(port , function () {
	console.log('Server now listening on port ' + port);
});

module.exports = app;
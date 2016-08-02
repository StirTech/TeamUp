// Morgan is an HTTP request logger middleware for Node.js.
// It simplifies the process of logging requests to your application.
// You might think of Morgan as a helper that collects logs from your
// server, such as your request logs. It saves developers time because 
// they don’t have to manually create common logs. It standardizes and
// automatically creates request logs.

var morgan = require('morgan');
var bodyParser = require('body-parser');

// We are using Middleware to do something for every request that
// hits our server. Logging and parsing are two operations commonly
// found in a middleware stack.

// The order of middleware definintion matters quite a bit.
// Requests flow through middleware functions in the order 
// they are defined. This is useful because many times
// middleware function is responsible for modifying the 'request'
// object in some way so the next middleware function (or route handler)
// has access to whatever the previous one just did.

module.exports = function(app, express){
	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(express.static(__dirname + '/../../client'));	
	app.use(function(req,res,next){
        var _send = res.send;
        var sent = false;
        res.send = function(data){
            if(sent) return;
            _send.bind(res)(data);
            sent = true;
        };
        next();
    });
};
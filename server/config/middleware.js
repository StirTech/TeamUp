var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = function(app, express){
    
    app.use(function(req, res, next) { 
        res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

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
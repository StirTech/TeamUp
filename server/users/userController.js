var Q = require('q');
var User = require('./userModel.js');
var findOneUser = Q.nbind(User.findOne, User);
var findAllUser = Q.nbind(User.find, User);
var createUser = Q.nbind(User.create, User);

module.exports = {
	
	signin: function(req, res, next){
		var username = req.body.username;
    	var password = req.body.password;
    	findOneUser({username:username})
    	.then(function (user) {
    		if(!user){
    			next(new Error("this user does not exist"))
    		}else{
    			return comparePasswords(password)
    			.then(function(foundUser){
    				if(foundUser){
    					var tokenData = jwt.encode(user,'secret');
    					res.json({tokenData:tokenData,user:user.username})
    				}else{
    					return next(new Error('this user not exist'));
    				}
    			})
    		}
    	})
    	.fail(function (error) {
         next(error);
      });
	},

	signup: function(){
		var username = req.body.username;
	    var password = req.body.password;
	    findOneUser({username: username})
	      .then(function (user) {
	        if (user) {
	          next(new Error('User already exist!'));
	        } else {
	          return createUser({
	            username: username,
	            password: password
	          });
	        }
	      })
	      .then(function (user) {
	        var token = jwt.encode(user, 'secret');
	        res.json({token: token, user:user.username});
	      })
	      .fail(function (error) {
	        next(error);
	      });
	},
	checkAuth: function (req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else { 
      //decoded user token
      var user = jwt.decode(token, 'secret');
      // find user from his name
      findOneUser({username: user.username})
        .then(function (foundUser) {
          if (foundUser) {
            res.send(200);
          } else {
            res.send(401);
          }
        })
        .fail(function (error) {
          next(error);
        });
    }
  },

	getUser: function(req, res, next){
		User.findOne({_id: req.params.id}, function(err, user){
			if(err) {
				res.status(500).send(err)
			}
			res.json(user)
		})
	},

	editUser: function(){
		
	},

	getPlayers: function(){
		
	}
}

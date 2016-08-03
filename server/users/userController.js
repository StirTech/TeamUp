var User = require('./userModel.js');


module.exports = {
	
	signin: function(req, res, next){
		var username = req.body.username;
		var password = req.body.password;
		User.findOne({username: username})
      		.exec(function (error, user) {
       			if (!user) {
     		 	    res.status(500).send(new Error('User does not exist'));
    		    } else {
       			    User.comparePassword(password,user.password, res, function(found){
        		        if(!found){
       				       res.status(500).send('Wrong Password');
      			        } else {
     			            var token = jwt.encode(user, 'secret');
         			        res.setHeader('x-access-token',token);
                            res.json({token: token});
                        }
                    });
                }
            });
	},

	signup: function(){
		var username = req.body.username;
	    var password = req.body.password;
	    User.findOne({username: username})
	 		.exec(function (error, user) {
	 		if(user){
	 			next(new Error('User already exist!'));
	 		}else{
	 			return User.create({
					username: username,
			        password: password
					})
	 		}
	 		})
	 
	},
	checkAuth: function (req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) {
    //   next(new Error('No token'));
    // } else { 
    //   //decoded user token
    //   var user = jwt.decode(token, 'secret');
    //   // find user from his name
    //   User.findOne({username: user.username})
    //     .then(function (foundUser) {
    //       if (foundUser) {
    //         res.send(200);
    //       } else {
    //         res.send(401);
    //       }
    //     })
    //     .fail(function (error) {
    //       next(error);
    //     });
    // }
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

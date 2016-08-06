var User = require('./userModel.js');

module.exports = {
	
	signin: function(req, res, next){
		//console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb')
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
         			        res.status(200).send('it signin');
                            res.json({token: token});
                        }
                    });
                }
            });
	},

	signup: function(req, res, next){
		//console.log("sssssssssssssssssssssssssssssssssssssss")
		var username = req.body.username;
	    var password = req.body.password;
	    User.findOne({username: username})
	 		.exec(function (error, user) {
		 		if(user){
		 			next(new Error('User already exist!'));
		 		}else{
	 				var newUser = new User ({
						username: username,
				        password: password,
				        firstName:req.body.firstName,
				        lastName:req.body.lastName,
				        city:req.body.city,
				        country:req.body.country,
				        rate:req.body.rate,
				        interests:req.body.interests,
				        picture:req.body.picture,
				        game:req.body.game,
					})
		 		}
	 		})
	 		newUser.save(function(err, newUser){
	            if(err){
	                res.status(500).send(err);
	            } else {
	              res.status(200).send(newUser);
	            };
	        });
	 
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

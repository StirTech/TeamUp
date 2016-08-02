
module.exports = {
signin: function (req, res, next) {
   var username = req.body.username;
    var password = req.body.password;
    findOneUser({username: username})
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
          return user.comparePasswords(password)
            .then(function (foundUser) {
              if (foundUser) {
                var token = jwt.encode(user, 'secret');
                res.json({token: token, user:user.username});
              } else {
                return next(new Error('No user'));
              }
            });
        }
      })
      .fail(function (error) {
        next(error);
      });
  },
  // the function that saves username and password when signup for the first time
  signup: function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    //console.log(username, password);
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
  }
}
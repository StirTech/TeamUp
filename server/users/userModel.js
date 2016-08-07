var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  country: {
    type: String
  },
  city: {
    type: String
  },
  rate: {
    type: String
  },
  interests: {
    type: String
  },
  picture: {
    type: String
  },
  games:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Game'
  }]
});


var User = mongoose.model('User', UserSchema);

User.comparePassword = function(candidatePassword, savedPassword, res, cb){
  bcrypt.compare( candidatePassword, savedPassword, function(err, isMatch){
    if(err){
      res.status(500).send('Error');
    } else if(cb){
      cb(isMatch);
    }
  });
};

// saving the password adding salt and hashing it 
UserSchema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});

module.exports = User;
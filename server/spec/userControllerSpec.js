var path = require('path');
var expect = require('chai').expect;
var mongoose = require('mongoose');

var server = require(path.join(__dirname, '..', './server.js'));
var userController = require(path.join(__dirname, '..', '../server/users/userController.js'));
var User = require(path.join(__dirname, '..', '../server/users/userModel.js'));

var dbURI = 'mongodb://localhost/teamupTEST';

// The `clearDB` helper function, when invoked, will clear the database
var clearDB = function (done) {
  mongoose.connection.collections['users'].remove(done);
  //done()
};

//=====================================================================
/*                       USER CONTROLLER                              */
//=====================================================================
describe('userController', function () {
  'use strict';

  before(function(done){
    if(mongoose.connection.db) {
      return done();
    }
    mongoose.connect(dbURI, done);
  });

  it('have function signin', function () {
    expect(userController.signin).to.be.a('function');
  });

  it('have function signup', function () {
    expect(userController.signup).to.be.a('function');
  });
   it('have function Auth', function () {
    expect(userController.checkAuth).to.be.a('function');
  });   

  it('have function getUser', function () {
    expect(userController.getUser).to.be.a('function');
  });

  it('have function editUser', function () {
    expect(userController.editUser).to.be.a('function');
  });

  it('have function getPlayers', function () {
    expect(userController.getPlayers).to.be.a('function');
  }); 

  // describe('userController', function () {
  //   beforeEach(function(done){
  //     clearDB(function(){
  //       var users = [{
  //         username: "fakeUser",
  //         firstName: "fake",
  //         lastName: "McFaker",
  //         password: "password",
  //         email: "fake@faker.com",
  //       }];

  //       User.create(users, done)
  //     });
  //   });

  //   it('getUser should return a User by ID', function () {
  //     userController.getUser({params: {id: "57a1ee80b9da087424a06257"}}, {status: 200}, function(err, user){
  //       expect(user.username).to.equal('fakeUser');
  //       done()
  //     })
  //   });
  // });
 
});

// var path = require('path');
// var expect = require('chai').expect;
// var mongoose = require('mongoose');

// var server = require(path.join(__dirname, '..', './server.js'));

// var userController = require(path.join(__dirname, '..', '../server/users/userController.js'));
// var User = require(path.join(__dirname, '..', '../server/users/userModel.js'));
// var gameController = require(path.join(__dirname,'..','../server/games/gameController.js'))


// var dbURI = 'mongodb://localhost/teamupTEST';


// /*                       USER CONTROLLER                              */
// //=====================================================================

// //=====================================================================
// describe('The Router Urls', function () {
//   'use strict';
//   it('it should have a signin function', function(done) {
//     chai.request(server)
//       .post('/api/users/singin')
//       .end(function(err, res){
//         res.should.have.status(200);
//         res.should.be.json;
//         res.body.should.be.a('object');
//         res.body.should.have.property('username');
//         res.body.should.have.property('password');
//         done();
//       });
//   });
// })
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var request = require("supertest");
var app = require('../server.js');
var should = chai.should();
var Game = require('../games/gameModel.js');
var User = require('../users/userModel.js');
var userController = require('../users/userController.js');
var mongoose = require('mongoose')
var should = chai.should();
chai.use(chaiHttp);

//=====================================================================
/*                       USER CONTROLLER                              */
//=====================================================================
describe('userController', function () {
  'use strict';

  it('have function signin', function () {
    expect(userController.signin).to.be.a('function');
    chai.request(server)
    .post('/api/users/signin') 
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      done();
    });
  });

  it('have function signup', function () {
    expect(userController.signup).to.be.a('function');
    chai.request(server)
    .post('/api/users/singup')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      done();
    });
  });
   xit('have function Auth', function () {
    expect(userController.checkAuth).to.be.a('function');
  });   

  describe('getUser', function () { 
    it('has function getUser', function () {
      expect(userController.getUser).to.be.a('function');
    });

    it('should get user by id and respond with a 200', function (done) {
        request(app)
          .get('/api/user/57a215575964e67c0a6d8e1f')
          .end(function (err , res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            done();
          })
      });

      it('should respond with a 500 if user not found', function (done) {
        request(app)
          .get('/api/user/:id')
          .end(function (err , res) {
            res.should.have.status(500);
            done();
          })
      });
  })

  it('have function editUser', function () {
    expect(userController.editUser).to.be.a('function');
  });

  it('have function getPlayers', function () {
    expect(userController.getPlayers).to.be.a('function');
  }); 

  

});

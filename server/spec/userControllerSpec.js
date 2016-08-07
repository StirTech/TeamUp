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
  
  var newUser;

  before(function(done){
    newUser = new User({
        username: "faker",
        firstName: "fake",
        lastName: "user",
        password: "123",
        email: "fake@user.com"
      })

    done()
  })

  after(function(done){
    newUser.remove()
    User.remove({username: 'fakest'}).exec()
    done()
  })

  function checkVerb(url , type, REST, status, done, json) {

    var api = {
      GET:  request(app).get(url),
      POST: request(app).post(url).send(json),
      PUT: request(app).put(url).send(json),
      DELETE: request(app).delete(url).send(json)
    }

    api[REST]
      .end(function (err , res) {
        res.should.have.status(status);
        if(type){
          res.should.be.json;
          res.body.should.be.a(type);
        }
        done();
      });
  }

  describe('signup', function () {
    it('have function signup', function (done) {
      expect(userController.signup).to.be.a('function');
      done()
    });

    it('should respond with 200 at user signup', function(done){
      
      checkVerb('/api/users/signup', 'object', 'POST', 200, done, {
        username: "fakest",
        firstName: "fake",
        lastName: "user",
        password: "123",
        email: "fake@user.com"
      })

    })

    it('should respond with a 500 if user already exists', function (done) {
        checkVerb('/api/user/:id', false, 'GET', 500, done, {username: "faker", password: "123"})
    });

  })

  describe('signin', function () {
    it('have function signin', function (done) {
      expect(userController.signin).to.be.a('function');
      done()
    });

    it('should respond with 200 at user signin', function(done){

      checkVerb('/api/users/signin', 'object', 'POST', 200, done, {username: 'fakest', password: '123'})

    })

    it('should respond with a 500 if user doea not exist', function (done) {
        checkVerb('/api/user/:id', false, 'GET', 500, done, {username: "fake", password: "123"})
    });

    it('should respond with a 500 if wrong passoword', function (done) {
        checkVerb('/api/user/:id', false, 'GET', 500, done, {username: "fakest", password: "1234"})
    });

  })

   xit('have function Auth', function () {
    expect(userController.checkAuth).to.be.a('function');
  });   

  describe('getUser', function () { 
    it('has function getUser', function () {
      expect(userController.getUser).to.be.a('function');
    });

    it('should get user by id and respond with a 200', function (done) {

      newUser.save(function(err, data){
        checkVerb('/api/user/'+data._id, 'object', 'GET', 200, done)
      })   

    });

    it('should respond with a 500 if user not found', function (done) {
        checkVerb('/api/user/:id', false, 'GET', 500, done)
    });

  });

  describe('editUser', function () { 
    it('have function editUser', function () {
      expect(userController.editUser).to.be.a('function');
    });

    it('should edit user by id and respond with a 200', function (done) {

      newUser.save(function(err, data){
        checkVerb('/api/user/'+data._id+'/edit', 'object', 'PUT', 200, done)
      })    
    });

    it('should respond with a 500 if user not found', function (done) {
      checkVerb('/api/user/:id/edit', false, 'PUT', 500, done, {'username': "text"})
    });
  });

  describe('getPlayers', function () { 
    it('have function getPlayers', function () {
      expect(userController.getPlayers).to.be.a('function');
    });

    it('should get players by id and respond with a 201', function (done) {

      newUser.save(function(err, data){
        checkVerb('/api/game/players', 'array', 'POST', 201, done, {playerIds: [data._id]})
      })    
    });

    it('should respond with a 500 if players not found', function (done) {
      checkVerb('/api/game/players', false, 'POST', 500, done)
    });     

  });

});

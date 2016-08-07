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
    done()
  })

  function checkGet(url , type , done) {
    request(app)
      .get(url)
      .end(function (err , res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a(type);
        done();
      });
  }

  it('have function signin', function () {
    expect(userController.signin).to.be.a('function');
    // chai.request(app)
    // .post('/api/users/signin') 
    // .end(function(err, res){
    //   res.should.have.status(200);
    //   res.should.be.json;
    //   res.body.should.be.a('object');
    //   done();
    // });
  });

  it('have function signup', function () {
    expect(userController.signup).to.be.a('function');
    // chai.request(app)
    // .post('/api/users/signup')
    // .end(function(err, res){
    //   res.should.have.status(200);
    //   res.should.be.json;
    //   res.body.should.be.a('object');
    //   done();
    // });
  });

   xit('have function Auth', function () {
    expect(userController.checkAuth).to.be.a('function');
  });   

  describe('getUser', function () { 
    it('has function getUser', function () {
      expect(userController.getUser).to.be.a('function');
    });

    it('should get user by id and respond with a 200', function (done) {

      newUser.save(function(err, data){
        checkGet('/api/user/'+data._id, 'object', done)
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

  });

  describe('editUser', function () { 
    it('have function editUser', function () {
      expect(userController.editUser).to.be.a('function');
    });

    it('should edit user by id and respond with a 200', function (done) {

      newUser.save(function(err, data){
        request(app)
          .put('/api/user/'+data._id+"/edit")
          .send({firstName: "test"})
          .end(function (err , res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            
            done();
          })  
      })    
    });

    it('should respond with a 500 if user not found', function (done) {
        request(app)
          .put('/api/user/:id/edit')
          .end(function (err , res) {
            res.should.have.status(500);
            done();
          })
    });
  });

  describe('getPlayers', function () { 
    it('have function getPlayers', function () {
      expect(userController.getPlayers).to.be.a('function');
    });

    it('should get players by id and respond with a 201', function (done) {

      newUser.save(function(err, data){
        request(app)
          .post('/api/game/players')
          .send({playerIds: [data._id]})
          .end(function (err , res) {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('array');

            done();
          })  
      })    
    });

    it('should respond with a 500 if players not found', function (done) {
        request(app)
          .post('/api/game/players')
          .end(function (err , res) {
            res.should.have.status(500);
            done();
          })
    });     

  });

});

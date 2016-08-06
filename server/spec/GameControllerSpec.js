var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var request = require("supertest");
var app = require('../server.js');
var Game = require('../games/gameModel.js');
var User = require('../users/userModel.js');
var gameController=require('../games/gameController.js');
var mongoose = require('mongoose')
var should = chai.should();
chai.use(chaiHttp);

//=====================================================================
/*                       GAME CONTROLLER                              */
//=====================================================================
describe('gameController', function () {
  'use strict';

  

  it('have function getAllGames', function () {
    expect(gameController.getAllGames).to.be.a('function');
  });

  it('should get array of games responds with a 200', function (done) {
    request(app)
      .get('/api/games')
      .end(function (err , res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        done();
      })
    });


  it('have function getGame', function () {
    expect(gameController.getGame).to.be.a('function');

  });
  it('should get an object of one game responds with a 200 status code', function (done) {
    var newGame = new Game({
     name : "Test GAME",
     description : "test description",
     type : "sport",
     owner : "57a4d2e78f9d3afc0f576031",
     numOfPlayers : 12,
     locationID : " Syria , Damascus",
     country : "Syria",
     city : "Damascus",
     date : new Date()
    })
    .save(function(err, data){
	    request(app)
	      .get('/api/game/'+data._id)
	      .end(function (err , res) {
	        res.should.have.status(200);
	        res.should.be.json;
	        res.body.should.be.a('object');
	        done();
	      })	
    })

    });

  it('have function createGame', function () {
    expect(gameController.createGame).to.be.a('function');
  });

  it('have function insertPlayer', function () {
    expect(gameController.insertPlayer).to.be.a('function');
  });

  it('should post id of player in players array in gameModel responds with a 201', function (done) {

    // create newGame fot test 
    var newGame = new Game({
     name : "Test GAME",
     description : "test description",
     type : "sport",
     owner : "57a4d2e78f9d3afc0f576031",
     numOfPlayers : 12,
     locationID : " Syria , Damascus",
     country : "Syria",
     city : "Damascus",
     date : new Date()
    });
    // create newUser for test
    var newUser= new User({
      username : "Test username",
      firstName : "test firstName",
      lastName : "tes lastName",
      password : "test password",
      email : "test email",

    });

    newUser.save();
    newGame.save(function (err , data) {
      request(app)
        // add Game _id in params
        .post('/api/game/'+data._id)
        // add User _id in req.body
        .send({userId : newUser._id})
        .end(function (err , res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          // remove newGame and newUser after finsh test
          newGame.remove();
          newUser.remove();
          done();
        });
    });
  });

  it('have function editGame', function () {
    expect(gameController.editGame).to.be.a('function');
  });

  it('have function removePlayer', function () {
    expect(gameController.removePlayer).to.be.a('function');
  });  

  it('should post id of player in players array in gameModel responds with a 201', function (done) {

    // create newGame fot test 
    var newGame = new Game({
     name : "Test GAME",
     description : "test description",
     type : "sport",
     owner : "57a4d2e78f9d3afc0f576031",
     numOfPlayers : 12,
     locationID : " Syria , Damascus",
     country : "Syria",
     city : "Damascus",
     date : new Date()
    });
    // create newUser for test
    var newUser= new User({
      username : "Test username",
      firstName : "test firstName",
      lastName : "tes lastName",
      password : "test password",
      email : "test email",

    });

    newUser.save();
    newGame.save(function (err , data) {
      request(app)
        // add Game _id in params
        .delete('/api/game/'+data._id)
        // add User _id in req.body
        .send({userId : newUser._id})
        .end(function (err , res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          // remove newGame and newUser after finsh test
          newGame.remove();
          newUser.remove();
          done();
        });
    });
  });

});

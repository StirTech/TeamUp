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
	var newGame;
	var newUser;
	beforeEach(function (done) {
		newGame = new Game({
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
	    newUser = new User({
			username : "Test username",
			firstName : "test firstName",
			lastName : "tes lastName",
			password : "test password",
			email : "test email",
	    });
    	newUser.save();
    	done();
	});

	function checkGet(url , type , done) {
		request(app)
		.get(url)
		.end(function (err , res) {
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a(type);
			done();
		});
	};
	function checkDelete(url , type , done) {
		request(app)
		.delete(url)
		.end(function (req , res) {
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a(type);
			done();
		});
	};
	function checkPost(url , type , done) {
		request(app)
		.post(url)
		.send(newGame)
		.end(function (req , res) {
			res.should.have.status(201);
			res.should.be.json;
			res.body.should.be.a(type);
			done();
		});
	};
	function checkPut(url , type , done) {
		request(app)
		.put(url)
		.send({	name : "test edit game",
				description : "test description",
				type : "sport",
				owner : "57a4d2e78f9d3afc0f576031",
				numOfPlayers : 12,
				locationID : " Syria , Damascus",
				country : "Syria",
				city : "Damascus",
				date : new Date()
			})
		.end(function (req , res) {
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a(type);
			done();
		});
	};
	describe('getAllGames', function(){
		it('have function getAllGames', function () {
			expect(gameController.getAllGames).to.be.a('function');
		});
		it('should get array of games responds with a 200 status code', function (done) {
			checkGet('/api/games', 'array' , done);
		});
	});
	describe('getGame', function(){
		it('have function getGame', function () {
			expect(gameController.getGame).to.be.a('function');
		});
		it('should get an object of one game responds with a 200 status code', function (done) {  
			newGame.save(function(err, data){
				checkGet('/api/game/'+data._id, 'object' ,done);
			});
			newGame.remove();
		}); 	
	});
	describe('createGame', function(){
		it('have function createGame', function () {
			expect(gameController.createGame).to.be.a('function');
		});
		it('should create a new game and respond with a 201 status code', function(done){
			newGame.save(function(){
				checkPost('/api/game', 'object', done);
			});
			newGame.remove();
		})
	});
	describe('editGame', function(){
		it('have function editGame', function () {
			expect(gameController.editGame).to.be.a('function');
		});
		it('should edit a game by id and respond with a 200', function(done){
			newGame.save(function(err, data){
				checkPut('/api/game/'+data._id+'/edit', 'object', done)
			});
			newGame.remove();
		})
	});

	describe('insertPlayer', function(){
		it('have function insertPlayer', function () {
			expect(gameController.insertPlayer).to.be.a('function');
		});
		it('should post id of player in players array in gameModel responds with a 201', function (done) {
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
	})


  it('have function removePlayer', function () {
    expect(gameController.removePlayer).to.be.a('function');
  });

  it('should post id of player in players array in gameModel responds with a 201', function (done) {
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

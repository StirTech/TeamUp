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
	var test = {name : "test edit game",
				description : "test description",
				type : "sport",
				owner : "57a4d2e78f9d3afc0f576031",
				numOfPlayers : 12,
				locationID : " Syria , Damascus",
				country : "Syria",
				city : "Damascus",
				date : new Date()
	}
	beforeEach(function(done){
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
		done();	
	});
	afterEach(function(done){
		//delete the game from the database
		Game.remove({name :'Test GAME'}).exec();
		Game.remove({name :'test edit game'}).exec();
		done();
	});
	before(function (done) {
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
	after(function(done){
		newUser.remove();
		done();
	});

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

	describe('getAllGames', function(){
		it('have function getAllGames', function () {
			expect(gameController.getAllGames).to.be.a('function');
		});
		it('should get array of games responds with a 200 status code', function (done) {
			checkVerb( '/api/games', 'array' , 'GET' , 200 , done);
		});
	});
	describe('getGame', function(){
		it('have function getGame', function () {
			expect(gameController.getGame).to.be.a('function');
		});
		it('should get an object of one game responds with a 200 status code', function (done) {  
			newGame.save(function(err, data){
				checkVerb('/api/game/'+data._id, 'object' ,'GET', 200 ,done);
			});
		}); 	
	});
	describe('createGame', function(){
		it('have function createGame', function () {
			expect(gameController.createGame).to.be.a('function');
		});
		it('should create a new game and respond with a 201 status code', function(done){
			checkVerb('/api/game', 'object', 'POST' , 201 , done , newGame);
		})
	});
	describe('editGame', function(){
		it('have function editGame', function () {
			expect(gameController.editGame).to.be.a('function');
		});
		it('should edit a game by id and respond with a 200', function(done){
			newGame.save(function(err, data){
				checkVerb('/api/game/'+data._id+'/edit', 'object', 'PUT' , 200 , done , test)
			});
		})
	});

	describe('insertPlayer', function(){
		it('have function insertPlayer', function () {
			expect(gameController.insertPlayer).to.be.a('function');
		});
		it('should post id of player in players array in gameModel responds with a 201', function (done) {
			newGame.save(function(err, data){
				checkVerb('/api/game/'+data._id, 'object', 'POST' , 201 , done , {userId : newUser._id})
			});
		});
	});

	describe('removePlayer', function(){
		it('have function removePlayer', function () {
			expect(gameController.removePlayer).to.be.a('function');
		});
		it('should remove player and responds with a 200 status code', function (done) {
			newGame.save(function(err, data){
				checkVerb('/api/game/'+data._id, 'object', 'DELETE' , 200 , done , {userId : newUser._id})
			});			
		});
	});
});

var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var app = require('../server.js');
var GAME = require('../games/gameModel.js');
var gameController=require('../games/gameController.js')

//=====================================================================
/*                       GAME CONTROLLER                              */
//=====================================================================
describe('gameController', function () {
  'use strict';
  it('have function getAllGames', function () {
    expect(gameController.getAllGames).to.be.a('function');
  });

  it('responds with a 200 (OK)', function (done) {

        request(app)
          .get('/api/games')
          .expect(200)
          .end(function(err,res){
            if(err) return done(err);
            console.log(res.body);
            done();
          })

      });

  it('have function getGame', function () {
    expect(gameController.getGame).to.be.a('function');
  });

  it('have function createGame', function () {
    expect(gameController.createGame).to.be.a('function');
  });

  it('have function insertPlayer', function () {
    expect(gameController.insertPlayer).to.be.a('function');
  });

  it('have function editGame', function () {
    expect(gameController.editGame).to.be.a('function');
  });

  it('have function removePlayer', function () {
    expect(gameController.removePlayer).to.be.a('function');
  });  
});

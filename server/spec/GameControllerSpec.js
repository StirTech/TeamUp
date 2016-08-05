var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var request = require("supertest");
var app = require('../server.js');
var GAME = require('../games/gameModel.js');
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

  it('responds with a 200 (OK)', function (done) {

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

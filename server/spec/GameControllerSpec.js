var expect = require('chai').expect;

var server = require('../server.js');
var gameController = require('../games/gameController.js');

//=====================================================================
/*                       GAME CONTROLLER                              */
//=====================================================================
describe('gameController', function () {
  'use strict';
  it('have function getAllGames', function () {
    expect(gameController.getAllGames).to.be.a('function');
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

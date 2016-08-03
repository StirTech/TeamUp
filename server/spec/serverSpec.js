var path = require('path');
var expect = require('chai').expect;

var server = require(path.join(__dirname, '..', './server.js'));
var userController = require(path.join(__dirname, '..', '../server/users/userController.js'));
var gameController = require(path.join(__dirname,'..','../server/games/gameController.js'))

//=====================================================================
/*                       USER CONTROLLER                              */
//=====================================================================
describe('userController', function () {
  'use strict';

  it('have function signin', function () {
    expect(userController.signin).to.be.a('function');
  });

  it('have function signup', function () {
    expect(userController.signup).to.be.a('function');
  });
   it('have function Auth', function () {
    expect(userController.checkAuth).to.be.a('function');
  });    
});

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



//=====================================================================
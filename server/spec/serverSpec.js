var path = require('path');
var expect = require('chai').expect;

var server = require(path.join(__dirname, '..', './server.js'));
var userController = require(path.join(__dirname, '..', '../server/users/userController.js'));



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


  
});
//=====================================================================
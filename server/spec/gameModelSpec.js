var expect = require('chai').expect;
var mongoose = require('mongoose');
var Game = require('../games/gameModel.js');

describe('Game Model', function () {

  it('should be a Mongoose model', function () {
    expect(new Game()).to.be.instanceOf(mongoose.Model);
  });

  it('should have a schema', function () {
    expect(Game.schema).to.exist;
  });


});

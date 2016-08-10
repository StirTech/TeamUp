var expect = require('chai').expect;
var sinon = require('sinon');
var mongoose = require('mongoose');
var User = require('../users/userModel.js');

describe('User Model', function () {
    // beforeEach(function() {
    //     sinon.stub(User, 'find');
    // });
 
 
    // afterEach(function() {
    //     User.find.restore();
    // });


  it('should be a Mongoose model', function () {
    expect(new User()).to.be.instanceOf(mongoose.Model);
  });

  it('should have a schema', function () {
    expect(User.schema).to.exist;
  });

  it('should be invalid if name is empty', function(done) {
        var anonUser = new User();
        anonUser.validate(function(err) {
            expect(err.errors.username).to.exist;
            done();
        });
    });
  it('should be invalid if firstName is empty', function(done) {
        var anonUser = new User();
        anonUser.validate(function(err) {
            expect(err.errors.firstName).to.exist;
            done();
        });
    });
   it('should be invalid if lastName is empty', function(done) {
        var anonUser = new User();
        anonUser.validate(function(err) {
            expect(err.errors.lastName).to.exist;
            done();
        });
    });
   	xit('should be invalid if password is empty', function(done) {
        var anonUser = new User();
        anonUser.validate(function(err) {
            expect(err.errors.password).to.exist;
            done();
        });
    });
   	it('should be invalid if email is empty', function(done) {
        var anonUser = new User();
        anonUser.validate(function(err) {
            expect(err.errors.email).to.exist;
            done();
        });
    });


});

'use strict';

describe('Services', function () {
  beforeEach(module('TeamUp.services'));

  afterEach(inject(function ($httpBackend) {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  }));


  describe('User Factory', function () {
    var $httpBackend, User;

    beforeEach(inject(function (_$httpBackend_, _User_) {
      $httpBackend = _$httpBackend_;
      User = _User_;
    }));

    it('should exist', function () {
      expect(User).to.exist;
    });

    it('should have a method `getUser`', function () {
      expect(User.getUser).to.be.a('function');
    });

    it('should have a method `editUser`', function () {
      expect(User.editUser).to.be.a('function');
    });

    it('should have a method `getPlayers`', function () {
      expect(User.getPlayers).to.be.a('function');
    });

    it('should get User by id with `getUser`', function () {
      var mockResponse = { 
            id: '123',
            username: 'test' 
          };

      $httpBackend.expect('GET', '/api/user/'+mockResponse.id).respond(mockResponse);

      User.getUser(mockResponse.id).then(function (User) {
        expect(User).to.deep.equal(mockResponse);
      });

      $httpBackend.flush();
    });

    it('should edit User by id with `editUser`', function () {
      var mockResponse = { 
            id: '123',
            username: 'test' 
          };
      var mockEdit = {
            username: 'testing' 
          };    

      $httpBackend
        .expect('PUT', '/api/user/'+mockResponse.id+'/edit', JSON.stringify(mockEdit))
        .respond(201, {
          id: '123',
          username: 'testing'
        });

      User.editUser(mockEdit, mockResponse.id).then(function (resp) {
        expect(resp.status).to.equal(201);
        expect(resp.data.username).to.equal('testing');
      });

      $httpBackend.flush();
    });

    it('should get players after being provided with an array of ids with `getPlayers`', function () {
      var mockResponse = [
        {id: '123', username: 'test'},
        {id: '124', username: 'tester'},
        {id: '125', username: 'testest'},
      ];

      $httpBackend
        .expect('POST', '/api/game/players', JSON.stringify(["123","124","125"]))
        .respond(201, mockResponse);

      User.getPlayers(['123', '124', '125']).then(function (resp) {
        expect(resp.status).to.equal(201);
        expect(resp.data[0].username).to.equal('test');
      });

      $httpBackend.flush();
    });

  });


  describe('Game Factory', function () {
    var $httpBackend, Game;

    beforeEach(inject(function (_$httpBackend_, _Game_) {
      $httpBackend = _$httpBackend_;
      Game = _Game_;
    }));

    it('should exist', function () {
      expect(Game).to.exist;
    });

    it('should have a method `getAll`', function () {
      expect(Game.getAll).to.be.a('function');
    });

    it('should have a method `getOne`',function () {
      expect(Game.getOne).to.be.a('function');
    });

    it('should have a method `addOne`',function () {
      expect(Game.addOne).to.be.a('function');
    });

    it('should have a method `insertPlayer`',function () {
      expect(Game.insertPlayer).to.be.a('function');
    });

    it('should have a method `removePlayer`',function () {
      expect(Game.removePlayer).to.be.a('function');
    });

    it('should get All Game with `getAll`', function () {
      var gamesResponse = [ 
        {
          id : "1",
          name : "game 1"
        },
        {
          id : "2",
          name : "game 2"
        }
      ];

      $httpBackend.expect('GET', '/api/games').respond(gamesResponse);

      Game.getAll().then(function (Games) {
        expect(Games).to.deep.equal(gamesResponse);
      });

      $httpBackend.flush();
    });

    it('should get Game by id with `getOne`', function () {
      var mockResponse = { 
            id: '123',
            name: 'test game' 
          };

      $httpBackend.expect('GET', '/api/game/'+mockResponse.id).respond(mockResponse);

      Game.getOne(mockResponse.id).then(function (Game) {
        expect(Game).to.deep.equal(mockResponse);
      });

      $httpBackend.flush();
    });

    it('should add new game with `addOne`',function () {
      var newGame = {
        id:"1",
        name : "game 1"
      };

      $httpBackend
      .expect('POST','/api/game',JSON.stringify(newGame))
      .respond({id : "1" , name : "game 1"});

      Game.addOne(newGame).then(function (res) {
        expect(res).to.deep.equal(newGame);
      });

      $httpBackend.flush();
    });

    it('should add new game with `editOne`',function () {
      var newGame = {
        id:"1",
        name : "game 1"
      };
      var editGame = {
        name : "Edited Game"
      }

      $httpBackend
      .expect('PUT','/api/game/'+newGame.id+'/edit',JSON.stringify(editGame))
      .respond(201,{id : "1" , name : "Edited Game"});

      Game.editOne(newGame.id,editGame).then(function (res) {
        expect(res.name).to.equal("Edited Game");
      });

      $httpBackend.flush();
    });

    it('should add a player to spicific game with `insertPlayer`',function () {
      var newGame = {
        id:"1",
        name : "game 1",
        players : []
      };
      var newUser = {
        id : "123",
        name : "new player"
      }

      $httpBackend
      .expect('POST','/api/game/'+newGame.id,{userId : "123"})
      .respond(201,{id : "1" , name : "game 1", players : ["123"]});

      Game.insertPlayer(newGame.id,newUser.id).then(function (res) {
        expect(res.id).to.equal("1");
        expect(res.name).to.equal("game 1");
        expect(res.players).to.include("123");
      });

      $httpBackend.flush();
    });

    xit('should remove a player to specific game with `removePlayer`',function () {
      var newGame = {
        id:"1",
        name : "game 1",
        players : ["123"]
      };
      var newUser = {
        id : "123",
        name : "Jon"
      }

      $httpBackend
      .expect('DELETE','/api/game/'+newGame.id,{userId : "123"})
      .respond(201,{id : "1" , name : "game 1", players : []});

      Game.removePlayer(newGame.id,newUser.id).then(function (res) {
        expect(res.id).to.equal("1");
        expect(res.name).to.equal("game 1");
        expect(res.players).to.not.include("123");
      });

      $httpBackend.flush();
    });


  });



});
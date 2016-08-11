'use strict';

describe('Routing', function () {
  var $route;
  beforeEach(module('TeamUp'));

  beforeEach(inject(function ($injector) {
    $route = $injector.get('$route');
  }));

  it('Should have /home route, template, and controller', function () {
    expect($route.routes['/home']).to.be.defined;
    expect($route.routes['/home'].controller).to.equal('gamesController');
    expect($route.routes['/home'].templateUrl).to.equal('app/game/games.html');
  });

  it('Should have /signup route, template, and controller', function () {
    expect($route.routes['/signup']).to.be.defined;
    expect($route.routes['/signup'].controller).to.equal('AuthController');
    expect($route.routes['/signup'].templateUrl).to.equal('app/auth/signup.html');
  });

  it('Should have /signin route, template, and controller', function () {
    expect($route.routes['/signin']).to.be.defined;
    expect($route.routes['/signin'].controller).to.equal('AuthController');
    expect($route.routes['/signin'].templateUrl).to.equal('app/auth/signin.html');
  });

  it('Should have /profile/:id route, template, and controller', function () {
    expect($route.routes['/profile/:id']).to.be.defined;
    expect($route.routes['/profile/:id'].controller).to.equal('profileController');
    expect($route.routes['/profile/:id'].templateUrl).to.equal('app/profile/profile.html');
  });

  it('Should have /profile/:id/edit route, template, and controller', function () {
    expect($route.routes['/profile/:id/edit']).to.be.defined;
    expect($route.routes['/profile/:id/edit'].controller).to.equal('editProfileController');
    expect($route.routes['/profile/:id/edit'].templateUrl).to.equal('app/profile/editProfile.html');
  });

  it('Should have /createGame route, template, and controller', function () {
    expect($route.routes['/createGame']).to.be.defined;
    expect($route.routes['/createGame'].controller).to.equal('createGameController');
    expect($route.routes['/createGame'].templateUrl).to.equal('app/game/createGame.html');
  });

  it('Should have /game/:id route, template, and controller', function () {
    expect($route.routes['/game/:id']).to.be.defined;
    expect($route.routes['/game/:id'].controller).to.equal('gameController');
    expect($route.routes['/game/:id'].templateUrl).to.equal('app/game/game.html');
  });

  it('Should have /game/:id/edit route, template, and controller', function () {
    expect($route.routes['/game/:id/edit']).to.be.defined;
    expect($route.routes['/game/:id/edit'].controller).to.equal('editGameController');
    expect($route.routes['/game/:id/edit'].templateUrl).to.equal('app/game/editGame.html');
  });


});

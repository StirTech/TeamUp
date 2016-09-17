[![Stories in Ready](https://badge.waffle.io/StirTech/TeamUp.png?label=ready&title=Ready)](https://waffle.io/StirTech/TeamUp)

# TeamUp

> Find people around who want to play a game with you anytime you choose. 

## Team

  - __Product Owner__: Rana Kelani
  - __Scrum Master__: Tawfik Kahwaje
  - __Development Team Members__: Ibrahim Tamimi, Saif Elokour, Rana Kelani, Tawfik Kahwaje

## Production Url

[teamup-me.herokuapp.com](https://teamup-me.herokuapp.com)


## Table of Contents

1. [Features](#Features)
1. [Architecture](#architecture)
	1. [Tech Stack](#tech-stack)
    1. [System Architecture](#system-architecture)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Running Tests](#running-tests)
    1. [Running Locally](#running-locally)
1. [Team](#team)
1. [Contributing](#contributing)

## Features

### Summary:
A webapp that helps you find people who want to play a game, whether it's sports or anything else. You can even join games people have started. (meetup for games)

#### Problem: How do I find players to join me in a game if everyone I now is too busy?

##### Well it's not easy:
- The only real option is going to a place frequented by people who play the game and hope they'll allow you to join in.

## Our Solution:
A website where people can go and post their games online, and join games that are nearby.

## Architecture

### Tech Stack

1) Front-End
- Angular
- Pubnub

2) Back-End
- Node/Express
- Mongoose
- MongoDB

3) Testing
- Mocha
- Chai
- Karma

4) Deployment
- Heroku

## Requirements

- Node 4.x.x
- mongoDB 4.x.x

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Running Tests

From within the root directory:

```sh
npm test
```

### Running Locally

From within the root directory:

```sh
mongod
```

In another terminal:

```sh
npm start
```

### Roadmap

View the project roadmap [here](issues)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
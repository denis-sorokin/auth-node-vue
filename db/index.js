const mongoose = require('mongoose');

const users = require('./User');
const games = require('./Game');
const gamePlayers = require('./GamePlayers');

const seeds = require('./seeds');

const models = {
	users: mongoose.model('user', users),
	games: mongoose.model('game', games),
	gamePlayers: mongoose.model('game_player', gamePlayers)
};

seeds(models);

module.exports = models;

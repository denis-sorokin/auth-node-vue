const seeds = require('./seeds');

const models = {
	users: require('./User'),
	games: require('./Game'),
	gamePlayers: require('./GamePlayers')
};

seeds(models);

module.exports = models;

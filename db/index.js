const mongoose = require('mongoose');
const chalk = require('chalk');

const users = require('./User');
const games = require('./Game');
const gamePlayers = require('./GamePlayers');

const seeds = require('./seeds');

const models = {
	users: mongoose.model('user', users),
	games: mongoose.model('game', games),
	gamePlayers: mongoose.model('game_player', gamePlayers)
};

gamePlayers.pre('save', true, async function(next) {
	if (this.game) {
		const user = await models.users.find({ id: this.user }).exec();
		await user.updateOne({ games: this.game });
		console.log(
			chalk.yellow(`Added game ${game._id} to user ${user._id}.`)
		);
	}
	next();
});

seeds(models);

module.exports = models;

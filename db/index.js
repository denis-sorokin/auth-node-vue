const mongoose = require('mongoose');
const chalk = require('chalk');

const users = require('./User');
const games = require('./Game');
const gamePlayers = require('./GamePlayers');

const usersModel = mongoose.model('user', users);
const gamesModel = mongoose.model('game', games);

// const seeds = require('./seeds');

gamePlayers.post('updateOne', async function() {
	try {
		const data = this.getUpdate();
		const thisId = this.getQuery();
		const thisGamePlayers = await gamePlayersModel.findOne({_id: thisId});

		/* find by thisId gamePlayer then get from this item userId */
		/* or send to update userId for get this from this trigger. */

		if (data.game) {
			const user = await usersModel.findOne({ _id: thisGamePlayers.user }).exec();
			await user.updateOne({ games: data.game }, err => {
				if (err) {
					console.log(
						chalk.bgRed('Cannot added game to user after update gamePlayers.\n', err)
					);
				}
				console.log(
					chalk.yellow(`Added game ${data.game._id} to user ${user._id}`)
				);
			});

		}
	} catch (err) {
		console.error(err);
	}
});
const gamePlayersModel = mongoose.model('game_player', gamePlayers);

const models = {
	users: usersModel,
	games: gamesModel,
	gamePlayers: gamePlayersModel
};

// seeds(models);

module.exports = models;

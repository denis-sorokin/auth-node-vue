const mongoose = require('mongoose');
const chalk = require('chalk');

const users = require('./User');
const games = require('./Game');
const gamePlayers = require('./GamePlayers');

const usersModel = mongoose.model('user', users);
const gamesModel = mongoose.model('game', games);

const seeds = require('./seeds');

gamePlayers.post('updateOne', async function() {
	try {
		const data = await this.getUpdate();
		const thisId = await this.getQuery();
		const thisGamePlayers = await gamePlayersModel.findOne({_id: thisId._id});

		/* find by thisId gamePlayer then get from this item userId */
		/* or send to update userId for get this from this trigger. */

		if (data.game) {
			const thisGame = await gamesModel.findOne({_id: data.game});

			const user = await usersModel.findOne({ _id: thisGamePlayers.user }).exec();

			await user.updateOne({ $push: { games: data.game }})
			.then(() => {
				console.log(
					chalk.yellow(`Added game ${ data.game } to user ${user._id}`)
				);
			})
			.catch((err) => {
				console.log(
					chalk.bgRed('Cannot added game to user after update gamePlayers.\n', err)
				);
			});

			await thisGame.updateOne({ $push: { players: thisId._id }})
			.then(() => {
				console.log(
					chalk.yellow(`Added gamePlayers ${ thisId._id } to GAME ${ data.game }`)
				);
			})
			.catch((err) => {
				console.log(
					chalk.bgRed('Cannot added gamePlayers to GAME after update gamePlayers.\n', err)
				);
			})
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

seeds(models);

module.exports = models;

const chalk = require('chalk');
const models = require('../../db');
const { ERRORS } = require('../../config/constants');

class FootballController {
	constructor() {}

	async getPlayers(Req, Res) {
		try {
			await models.users.find().populate(['games']).exec((err, users) => {
				if (err) {
					console.log(
						chalk.bgRed('Error getUsers\n', err)
					);
					Res.send({error: { msg: ERRORS.FOOTBALL.CANNOT_GET_PLAYERS, detail: err }}, 500)
				} else {
					Res.send(users);
				}
			});
		} catch (e) {
			Res.send({error: { msg: ERRORS.UNKNOWN_ERROR, detail: e }}, 500);
		}
	};

	async getGames(Req, Res) {
		try {
			await models.games.find().populate(['players']).exec((err, games) => {
				if (err) {
					console.log(
						chalk.bgRed('Error getGames\n', err)
					);
					Res.send({error: { msg: ERRORS.FOOTBALL.CANNOT_GET_GAMES, detail: err }}, 500)
				} else {
					Res.send(games);
				}
			});
		} catch (e) {
			Res.send({error: { msg: ERRORS.UNKNOWN_ERROR, detail: e }}, 500);
		}
	};

}

module.exports = new FootballController();

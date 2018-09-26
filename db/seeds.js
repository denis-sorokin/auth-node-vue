const chalk = require('chalk');
// const db = require('mongoose');
const connection = require('../config/db');
const { FOOTBALL } = require('../config/constants');

const userBase = [
	{
		username: 'Test',
		email: 'test@gmail.com',
		password: 12345,
		score: 110
	},
	{
		username: 'PlayerTom',
		email: 'tomas@gmail.com',
		password: 13245,
		score: 111
	},
	{
		username: 'RyanGosling',
		email: 'gosling@gmail.com',
		password: 12435,
		score: 115
	},
	{
		username: 'EvaLongoria',
		email: 'longoria@gmail.com',
		password: 15355,
		score: 117
	}
];
const gameBase = {
	plannedDate: new Date()
};
const gamePlayersBase = (user) => {
	return {
		user: user._id,
		team: FOOTBALL.TEAM[2]
	};
};

module.exports = async function (models) {
	await connection.dropDatabase();
	console.log(
		chalk.red('Database droped.')
	);
	await connection.useDb(process.env.DB_NAME);

	console.log(
		chalk.bgGreen(`Database ${process.env.DB_NAME} created!`)
	);

	/* Create users */
	await Promise.all(userBase.map(async el => {
		const user = models.users(el);

		await user.save().then(e => {
			console.log(chalk.bgGreen(`Created ${ e.username } user.`));
		}).catch(err => {
			console.log(
				chalk.bgRed('Cannot save USER.\n', err)
			);
		});

		/* Subscribe to the game */
		const gamePlayers = models.gamePlayers(gamePlayersBase(user));
		await gamePlayers.save().then(e => {
			console.log(chalk.bgGreen(`Register user ${ e._id } in GAME_PLAYERS.`));
		})
		.catch(err => {
			console.log(
				chalk.bgRed('Cannot save GAME_PLAYERS.\n', err)
			);
		});
	})
	);

	/* Create game */
	let countWaitingUsers = 0;

	await models.gamePlayers.countDocuments('game_players', (err, count) => {
		countWaitingUsers = count;
	});

	/* Four players for game */
	if (countWaitingUsers === 4) {
		const game = models.games(gameBase);

		game.save().then(async gameThen => {
			console.log(chalk.bgGreen(`Created ${ gameThen._id } game.`));

			const waitingUsers = await models.gamePlayers.find({ game: null }).exec();

			await Promise.all(waitingUsers.map(async (gamePlayer, index) => {
				await gamePlayer.updateOne({
					game: gameThen._id,
					team: 1 % index === 1? FOOTBALL.TEAM[0] : FOOTBALL.TEAM[1]
				}, err => {
					if (err) {
						console.log(
							chalk.bgRed('Error when update waitingUsers in gamePlayers.\n', err)
						);
					}
					console.log(chalk.bgGreen(`User ${ gamePlayer._id } register on created game and set team.`));
				})
			})
			);

			models.gamePlayers.find().populate(['user', 'game']).exec((err, docs) => {
				console.log(err, docs);
			})
		})
		.catch(err => {
			console.log(
				chalk.bgRed('Cannot save GAME.\n', err)
			);
		})
	}
};

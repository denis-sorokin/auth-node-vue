const chalk = require('chalk');
// const db = require('mongoose');
const connection = require('../config/db');
const { FOOTBALL } = require('../config/constants');

const userBase = [
	{
		username: 'Test',
		email: 'tet@gmail.com',
		password: 12345,
		score: 110
	},
	{
		username: 'EbayEbay',
		email: 'ttt@gmail.com',
		password: 12345,
		score: 110
	},
	{
		username: 'Ebal',
		email: 'test23@gmail.com',
		password: 12345,
		score: 110
	},
	{
		username: 'Hualdo',
		email: 'tst55@gmail.com',
		password: 12345,
		score: 110
	},
	{
		username: 'Ronaldo',
		email: 'tsss55@gmail.com',
		password: 12345,
		score: 110
	},
	{
		username: 'Macumba',
		email: 'waa@gmail.com',
		password: 12345,
		score: 110
	},
	{
		username: 'Pumba',
		email: 'toaas@gmail.com',
		password: 13245,
		score: 111
	},
	{
		username: 'Jenifer',
		email: 'test23@gmail.com',
		password: 12345,
		score: 110
	},
	{
		username: 'Wilson',
		email: 'test55@gmail.com',
		password: 12345,
		score: 110
	},
	{
		username: 'Flanders',
		email: 'tes55@gmail.com',
		password: 12345,
		score: 110
	},
	{
		username: 'Homer',
		email: 'wat@gmail.com',
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
	planned_date: new Date()
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
		const user = await models.users(el);

		/* Save user */
		await user.save()
		.then(e => {
			console.log(chalk.bgGreen(`Created ${ e.username } user.`));
		})
		.catch(err => {
			console.log(
				chalk.bgRed('Cannot save USER.\n', err)
			);
		});

		/* Create game */
		let countWaitingUsers = await models.gamePlayers.countDocuments('game_players');

		/* Check four players for game */
		if (countWaitingUsers >= 4) {
			try {
				const game = await models.games(gameBase);

				await game.save().then(async gameThen => {
					console.log(chalk.bgGreen(`Created ${ gameThen._id } game.`));

					const waitingUsers = await models.gamePlayers
						.find({ game: null })
						// .sort({score: 'asc'})
						.limit(4)
						.exec();

					await Promise.all(waitingUsers.map(async (gamePlayer, index) => {
						gamePlayer.updateOne({
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
					}));

					/* example get game players with join user and game */
					// models.gamePlayers.find().populate(['user', 'game']).exec((err, docs) => {
					// 	console.log(err, docs);
					// })
				})
				.catch(err => {
					console.log(
						chalk.bgRed('Cannot save GAME.\n', err)
					);
				})
			} catch (err) {
				console.error(err)
			}
		} else {
			/* Subscribe to the game */
			const gamePlayers = await models.gamePlayers(gamePlayersBase(user));

			try {
				await gamePlayers.save()
					.then(e => {
						console.log(chalk.bgGreen(`Register user ${ user._id } in GAME_PLAYERS ${ e._id }.`));
					})
					.catch(err => {
						console.log(
							chalk.bgRed('Cannot save GAME_PLAYERS.\n', err)
						);
					});
			} catch (err) {
				console.error(
					chalk.bgRed(err)
				);
			}
		}
	})
	);
};

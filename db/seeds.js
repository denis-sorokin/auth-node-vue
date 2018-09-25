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
	await connection.useDb('auth_node_vue');

	console.log(
		chalk.bgGreen('Database created!')
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

		game.save().then(async e => {
			console.log(chalk.bgGreen(`Created ${ e._id } game.`));

			const waitingUsers = await models.gamePlayers.find({ game: null }).populate('users').exec();

			waitingUsers.forEach((gamePlayer, index) => {
				gamePlayer.updateOne({
					game: gamePlayer._id,
					team: 1 % index === 1? FOOTBALL.TEAM[0] : FOOTBALL.TEAM[1]
				}, err => {
					if (err) {
						console.log(
							chalk.bgRed('Error when update waitingUsers in gamePlayers.\n', err)
						);
					}
					console.log(chalk.bgGreen(`User ${ gamePlayer._id } register on created game and set team.`));
				})
			});
		})
		.catch(err => {
			console.log(
				chalk.bgRed('Cannot save GAME.\n', err)
			);
		})
	}
};

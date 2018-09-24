const db = require('../config/db');
const models = require('../db');

// each of the following array will be iterated and Created
const users = [
	{
		username: 'test',
		password: 12345,
		email: "email@mail.com"
	}
];

const games = [
	{
		refereeId: 1,
		plannedDate: '2018-09-24 11:56:06'
	}
];

// Sync and restart db before seeding
db.sync(
	// { force: true }
	)
	.then(() => {
		console.log('synced DB and dropped old data');
	})
	.then(() => {
		return models.users.bulkCreate(users);
	})
	.then(createdUsers => {
		console.log(`${createdUsers.length} users created`);
	})
	.then(() => {
		return models.games.bulkCreate(games);
	})
	.then(createdGames => {
		console.log(`${createdGames.length} games created`);
	})
	.then(() => {
		console.log('Seeded successfully');
	})
	.catch(err => {
		console.error('Error!', err, err.stack);
	})
	.finally(() => {
		db.close();
		console.log('Finished!');
		return null;
	});

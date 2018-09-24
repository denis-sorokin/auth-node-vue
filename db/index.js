const db = {
	users: require('./User'),
	games: require('./Game'),
	gamePlayers: require('./GamePlayers')
};

Promise.all(
	Object.keys(db).map(async table => {
		if (typeof db[table].associations === 'function') {
			await db[table].associations(db);
		}
		return table
	})
).then( tables => {
	tables.forEach(async table => {
		await db[table].sync();
	})
});

module.exports = db;

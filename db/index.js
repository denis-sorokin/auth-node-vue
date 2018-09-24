const db = {
	gamePlayers: require('./GamePlayers'),
	users: require('./User'),
	games: require('./Game')
};

Object.keys(db).forEach(table => {
	if ('associate' in db[table]) {
		db[table].associate(db);
	}
	db[table].sync({ force: true }).then(() => {
		if (table === 'users') {
			db.users.create({username: 'test', password: 12345, email: "email@mail.com"});
		}
	});
});


module.exports = db;

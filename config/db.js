const mongoose = require('mongoose');
const chalk = require('chalk');

const urlDatabase = `${process.env.DB_DIALECT}://${process.env.DB_HOST}/${process.env.DB_NAME}`;
const options = {
	server: {
		socketOptions: { keepAlive: 1 },
		auto_reconnect: true
	}
};

mongoose.connect(urlDatabase, options);

mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.once('open' ,() => {
	console.log(
		chalk.green(`Mongo database ${process.env.DB_NAME} SUCCESSFUL connected!`)
	);
});
db.on('error', function(error) {
	console.error(
		chalk.red('Mongo database connection ERROR: ' + error)
	);
	mongoose.disconnect();
});

db.on('close', function() {
	console.log(
		chalk.red('Mongo database connection CLOSED.')
	);
	mongoose.connect(urlDatabase, options);
});

module.exports = db;

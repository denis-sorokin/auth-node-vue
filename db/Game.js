const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
	planned_date: {
		type: Date,
	}
});

module.exports = gameSchema;

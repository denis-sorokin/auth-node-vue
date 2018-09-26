const mongoose = require('mongoose');

const gamePlayerSchema = new mongoose.Schema({
	game: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'game'
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},
	score: {
		type: Number,
		default: 0
	},
	team: {
		type: String // ENUM FOOTBALL.TEAM from constants
	}
});

module.exports = gamePlayerSchema;

const mongoose = require('mongoose');

const gamePlayerSchema = new mongoose.Schema({
	gameId: {
		type: String
	},
	userId: {
		type: String
	},
	score: {
		type: Number,
		default: 0
	},
	team: {
		type: String // ENUM FOOTBALL.TEAM from constants
	}
});

module.exports = mongoose.model('Game_Player', gamePlayerSchema);

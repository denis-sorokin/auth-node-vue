const mongoose = require('mongoose');

const gamePlayerSchema = new mongoose.Schema({
	game: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Game'
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
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

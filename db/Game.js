const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
	planned_date: {
		type: Date,
	},
	winners: {
		type: String
	},
	players: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'game_player'
	}]
});

module.exports = gameSchema;

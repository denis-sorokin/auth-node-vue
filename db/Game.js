const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
	plannedDate: {
		type: Date,
	}
});

module.exports = mongoose.model('Game', gameSchema);

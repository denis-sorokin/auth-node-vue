const mongoose = require('mongoose');

const { ROLE, PERMISSIONS } = require('../config/constants');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true
	},
	email: {
		type: String,
		unique: true
	},
	password: {
		type: String,
	},
	football_score: {
		type: Number,
		default: 100
	},
	games: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'game'
	}],
	permission: {
		type: Number,
		default: ROLE.reader(PERMISSIONS)
	}
});

module.exports = userSchema;

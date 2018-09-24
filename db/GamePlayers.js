const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const { FOOTBALL } = require('../config/constants');

const GamePlayers = sequelize.define('game_players', {
	gameId: {
		type: Sequelize.INTEGER
	},
	userId: {
		type: Sequelize.INTEGER
	},
	score: {
		type: Sequelize.TINYINT
	},
	team: {
		type: Sequelize.ENUM(FOOTBALL.TEAM)
	}
}, {
	timestamps: true,
	freezeTableName: true
});

// GamePlayers.sync({ force: true });

module.exports = GamePlayers;

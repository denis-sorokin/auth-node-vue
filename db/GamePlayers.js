const sequelize = require('../config/db');

const GamePlayers = sequelize.define('game_players', {}, {
	freezeTableName: true // Model tableName will be the same as the model name
});

// Game.sync({ force: true });

module.exports = GamePlayers;

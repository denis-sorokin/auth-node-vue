const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Game = sequelize.define('game', {
	plannedDate: {
		type: Sequelize.DATE,
	},
	teamA: {
		type: Sequelize.TINYINT,
	},
	teamB: {
		type: Sequelize.TINYINT,
	}
}, {
	freezeTableName: true // Model tableName will be the same as the model name
});

Game.associate = function(models) {
	Game.belongsToMany(models.users, { through: models.gamePlayers });
	Game.belongsTo(models.users, { as: 'referee' })
};

// Game.sync({ force: true });

module.exports = Game;

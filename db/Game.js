const Sequelize = require('sequelize');
const sequelize = require('../config/db');

let Game = sequelize.define('game', {
	plannedDate: {
		type: Sequelize.DATE,
	}
}, {
	timestamps: true,
	freezeTableName: true
});

Game.associations = async function(models) {
	await Game.belongsTo(models.users, { foreignKey: 'referee', targetKey: 'id' });
	await Game.belongsToMany(models.users, {
		through: models.gamePlayers, foreignKey: 'gameId'
	});
};

// Game.sync({ force: true });

module.exports = Game;

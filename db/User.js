const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const { ROLE, PERMISSIONS } = require('../config/constants');

let User = sequelize.define('user', {
    username: {
        type: Sequelize.STRING,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
    },
	score: {
    	type: Sequelize.FLOAT,
		defaultValue: 1.00
	},
	permission: {
    	type: Sequelize.INTEGER,
		defaultValue: ROLE.reader(PERMISSIONS)
	}
}, {
	timestamps: true,
	freezeTableName: true
});

User.associations = async function(models) {
	await User.belongsToMany(models.games, {
		through: models.gamePlayers, foreignKey: 'userId'
	});
};

// User.sync();

module.exports = User;

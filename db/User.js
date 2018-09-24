const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const { ROLE, PERMISSIONS } = require('../config/constants');

const User = sequelize.define('user', {
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
    freezeTableName: true // Model tableName will be the same as the model name
});

// User.sync({ force: true });

module.exports = User;

const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const UserRole = sequelize.define('user_role', {
	userId: {
		type: Sequelize.INTEGER
	},
	roleId: {
		type: Sequelize.INTEGER
	}
}, {
	freezeTableName: true // Model tableName will be the same as the model name
});

UserRole.sync();

module.exports = UserRole;

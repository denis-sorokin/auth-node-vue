const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const { ROLES, PERMISSIONS } = require('../config/constants');

const Role = sequelize.define('role', {
	name: {
		type: Sequelize.ENUM(ROLES),
		unique: true
	},
	permissions: {
		type: Sequelize.STRING,
		unique: true
	}
}, {
	freezeTableName: true // Model tableName will be the same as the model name
});

Role.sync().then(() => {
	const role = {
		data: [
			{ name: 'ADMIN', permissions: PERMISSIONS.join(',') },
			{ name: 'MODER', permissions: PERMISSIONS.slice(1).join(',') },
			{ name: 'USER', permissions: PERMISSIONS.slice(2).join(',') }
		]
	}
});

module.exports = Role;

const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const { ERRORS } = require('../config/constants');

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
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

User.custom = {
    getAll: async () => {
        try {
	        let users = await sequelize.query(`
                SELECT
                USER.name AS name,
                USER.email AS email,
                ROLE.roleId AS role
                FROM user AS USER
                LEFT JOIN user_role AS ROLE on ROLEs.userId = USER.id
                WHERE TRUE
	        `);
	        return users;
        } catch (e) {
            console.error(e);
            return ERRORS.USERS.CANNOT_GET_USERS
        }
    }
};

User.sync();

module.exports = User;

const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('user', {
    username: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

User.sync({force: true}).then(function () {
    // Table created
    return User.create({
        username: 'Admin',
        email: 'smartit@gmail.com'
    });
});

module.exports = User;

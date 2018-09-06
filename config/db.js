const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        define: {
            timestamps: false,
        }
    });

module.exports = sequelize;

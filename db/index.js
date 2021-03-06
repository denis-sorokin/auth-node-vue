const fs = require('fs');
const path = require('path');
let db = {};
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: process.env.DB_DIALECT,
		define: {
			timestamps: false
		}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// read dir and init models
fs
	.readdirSync(__dirname)
	.filter(file => {
		return (file.indexOf('.') !== 0) && (file !== 'index.js');
	})
	.forEach(file => {
		let model = sequelize.import(path.join(__dirname, file));
		db[model.name] = model
	});

module.exports = db;

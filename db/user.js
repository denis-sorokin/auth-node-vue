const bcrypt = require('bcrypt');
const _ = require('lodash');

const { ROLE, PERMISSIONS, ERRORS } = require('../config/constants');

module.exports = function (sequelize, DataTypes) {
	const User = sequelize.define('User', {
		username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			validate: {
				notEmpty: { msg: ERRORS.AUTH.REQUIRED_USERNAME }
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: { msg: ERRORS.AUTH.REQUIRED_PASSWORD }
			}
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			validate: {
				notEmpty: { msg: ERRORS.AUTH.REQUIRED_EMAIL }
			}
		},
		permissions: {
			type: DataTypes.INTEGER,
			defaultValue: function() {
				return ROLE.reader(PERMISSIONS)
			}
		}
	});

	User.prototype.validPassword = function(password) {
		return bcrypt.compareSync(password, this.password);
	};

	User.hook('beforeCreate', (user) => {
		const salt = bcrypt.genSaltSync(_.toNumber(process.env.BCRYPT_ROUNDS));
		user.password = bcrypt.hashSync(user.password, salt);
	});
	return User
};

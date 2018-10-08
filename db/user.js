const bcrypt = require('bcrypt');
const _ = require('lodash');

const { ROLE, PERMISSIONS, ERRORS } = require('../config/constants');

module.exports = function (sequelize, DataTypes) {
	const User = sequelize.define('User', {
		username: {
			type: DataTypes.STRING,
			unique: true,
			validate: { notEmpty: { msg: ERRORS.AUTH.REQUIRED_USERNAME } }
		},
		password: {
			type: DataTypes.STRING,
			validate: { notEmpty: { msg: ERRORS.AUTH.REQUIRED_PASSWORD } }
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			validate: { notEmpty: { msg: ERRORS.AUTH.REQUIRED_EMAIL } }
		},
		permissions: {
			type: Number,
			default: ROLE.reader(PERMISSIONS)
		}
	}, {
		classMethods: {
			validPassword: function(password, passwd, done, user) {
				bcrypt.compare(password, passwd, (err, isMatch) => {
					if (err) console.error(err);
					if (isMatch) {
						return done(null, user)
					} else {
						return done(null, false)
					}
				})
			}
		}
	}, {
		dialect: 'mysql'
	});

	User.hook('beforeCreate', (user) => {
		const salt = bcrypt.genSaltSync(_.toNumber(process.env.BCRYPT_ROUNDS));
		user.password = bcrypt.hashSync(user.password, salt);
	});
	return User
};

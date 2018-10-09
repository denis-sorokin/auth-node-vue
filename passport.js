const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./db');
const { ERROR } = require('./config/constants');

// Serialize session
passport.serializeUser((user, done) => {
	done(null, user);
});

// Deserialize session
passport.deserializeUser((user, done) => {
	db.User.find({ where: { id: user.id } })
	.then(user => {
		done(null, user);
	})
	.catch(err => {
		done(err, null);
	})
});

// Auth
passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	},
	(email, password, done) => {
		db.User.findOne({where: { email: email }}).then((err, user) => {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, {message: ERROR.AUTH.INCORRECT_EMAIL});
			}
			if (!user.validPassword(password)) {
				return done(null, false, {message: ERROR.AUTH.INCORRECT_PASSWORD});
			}
			return done(null, user);
		});
}));

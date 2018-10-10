const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require('jwt-simple');
const _ = require('lodash');
const db = require('../../db/index');
const encrypt = require('../utils/encrypt');
const { ERRORS, NOTIFICATION } = require('../../config/constants');
const passport = require('passport');

class UserController {
	constructor() {
		this.payload = {
			expires: moment().utc().add({ hours: 3 }).format()
		};
	}

    signUp(Req, Res) {
        const { username, password, email } = Req.body;

        bcrypt.hash(password, _.toNumber(process.env.BCRYPT_ROUNDS), async function(err, hash) {
            if (hash) {
                try {
                    await db.User.create({ username, email, password: hash });
                    Res.send({ msg: NOTIFICATION.USERS.USER_CREATED })
                }
                catch (err) {
                    let messages = err.errors.reduce((ac, val) => {
                        return ac.concat(val.message);
                    }, []);

                    Res.send({ error: { msg: ERRORS.USERS.CANNOT_CREATE_USER, detail: messages } }, 400)
                }
            }
            if (err) {
                Res.send({ error: { msg: ERRORS.USERS.CANNOT_CREATE_USER } }, 500);
                console.log(`==create_pass_error==\n ${err}\n=====\n`);
            }
        });
    }

	// login
	async createToken(Req, Res) {
		// params from @/passport.js
		passport.authenticate('local', (err, user, info) => {
			return err
				? Res.send({ error: { msg: info, detail: err } }, 400)
				: user
					? Req.logIn(user, err => {
						if (err) {
							Res.send({ error: { msg: info, detail: err } }, 400)
						} else {
							const token = jwt.encode({
									...this.payload,
									...{ user: user.email }
								},
								process.env.SECRET
							);

							const response = {
								user: {
									// email is secret
									// email: user.email,
									username: user.username
								},
								token,
								exp: this.payload.expires
							};

							Res.send(response, 200);
						}
					})
					: Res.send({ error: { msg: info, detail: err } }, 400)
		})(Req, Res);
	}
}

module.exports = new UserController();

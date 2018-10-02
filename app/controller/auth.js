const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require('jwt-simple');
const db = require('../../db');
const encrypt = require('../utils/encrypt');
const { ERRORS, NOTIFICATION } = require('../../config/constants');

class AuthController {
	constructor() {
		this.payload = {
			expires: moment().utc().add({ hours: 3 }).format()
		};
	}

    signUp(Req, Res) {
        const { username, password, email } = encrypt.getClientPassword(Req.body);

        bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS), async function(err, hash) {
            if (hash) {
                try {
                    await db.users.create({ username, email, password: hash });
                    Res.send({ msg: NOTIFICATION.USERS.USER_CREATED })
                }
                catch (e) {
                    Res.send({ error: { msg: ERRORS.USERS.CANNOT_CREATE_USER, detail: e.errmsg } }, 400)
                }
            }
            if (err) {
                Res.send({ error: { msg: ERRORS.USERS.CANNOT_CREATE_USER } }, 500);
                console.log(`==create_pass_error==\n ${err}\n=====\n`);
            }
        });
    }

	async createToken(Req, Res) {
		const { email, password } = encrypt.getClientPassword(Req.body);

		if (email && password) {
			try {
				const user = await db.users.findOne({ email }).exec();

				if (user && user.email) {
					const valid = await bcrypt.compare(password, user.password);

					if(valid) {
						const token = jwt.encode({
								...this.payload,
								...{ user: user.email }
							},
							process.env.SECRET
						);

						const response = {
							user: {
								username: user.username,
								permission: user.permission
							},
							token
						};

						Res.send(response, 200);
					} else {
						Res.send({error: { msg: ERRORS.AUTH.WRONG_PASSWORD }}, 500);
					}
				} else {
					Res.send({error: { msg: ERRORS.AUTH.NOT_FOUND}}, 400);
				}
			} catch (e) {
				Res.send({error: { msg: ERRORS.UNKNOWN_ERROR, detail: e }}, 500);
			}
		} else {
			Res.send({ error: { msg: ERRORS.AUTH.INVALID } }, 400);
		}
	};
}

module.exports = new AuthController();

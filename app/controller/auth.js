const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require('jwt-simple');
const db = require('../../db/index');
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
                    // let messages = e.errors.reduce((ac, val) => {
                    //     return ac.concat(val.message);
                    // }, []);

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
				await db.users.findOne({ email }).exec(async (err, result) => {
					if (result && result.email) {
						const valid = await bcrypt.compare(password, result.password);

						if(valid) {
							const token = jwt.encode({
									...this.payload,
									...{ user: result.email }
								},
								process.env.SECRET
							);

							const response = {
								user: {
									username: result.username
								},
								token,
								// exp: this.payload.expires
							};

							Res.send(response, 200);
						} else {
							Res.send({error: { msg: ERRORS.AUTH.WRONG_PASSWORD }}, 500);
						}
					} else {
						Res.send({error: { msg: ERRORS.AUTH.NOT_FOUND}}, 400);
					}
				});
			} catch (e) {
				Res.send({error: { msg: ERRORS.UNKNOWN_ERROR, detail: e }}, 500);
			}
		} else {
			Res.send({ error: { msg: ERRORS.AUTH.INVALID } }, 400);
		}
	};
}

module.exports = new AuthController();

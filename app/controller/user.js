const bcrypt = require('bcrypt');
const db = require('../../db/index');
const encrypt = require('../utils/encrypt');
const { ERRORS, NOTIFICATION } = require('../../config/constants');

class UserController {
    signUp(Req, Res) {
        const { username, password, email } = encrypt.getClientPassword(Req.body);

        bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS), async function(err, hash) {
            if (hash) {
                try {
                    await db.users.create({ username, email, password: hash });
                    Res.send({ msg: NOTIFICATION.USERS.USER_CREATED })
                }
                catch (e) {
                    let messages = e.errors.reduce((ac, val) => {
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
}

module.exports = new UserController();

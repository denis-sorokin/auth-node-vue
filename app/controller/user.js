const bcrypt = require('bcrypt');
const db = require('../../db/index');
const { ERRORS, NOTIFICATION } = require('../../config/constants');

class UserController {
    signUp(Req, Res) {
        bcrypt.hash('myPassword', process.env.BCRYPT_ROUNDS, function(err, hash) {
            if (hash) {
                db.users.create({ username: Req.body.username, email: Req.body.email, password: hash });
                Res.send({ msg: NOTIFICATION.USERS.USER_CREATED })
            }
            if (err) {
                Res.send({ error: { msg: ERRORS.USERS.CANNOT_CREATE_USER } });
                console.log('==create_pass_error==\n', error, '=====\n');
            }
        });
    }
}

module.exports = new UserController();

const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');
const moment = require('moment');
const db = require('../../db/index');
const encrypt = require('../utils/encrypt');
const { ERRORS } = require('../../config/constants');


class AuthMiddleware {
    constructor() {
        this.payload = {
            expires: moment().utc().add({ hours: 3 }).format()
        };
    }

    async createToken(Req, Res) {
        const { email, password } = encrypt.getClientPassword(Req.body.crypt);

        if (email && password) {
            try {
                const userBase = await db.users.findOne({ where: { email } });

                if (userBase && userBase.email) {
                    const valid = await bcrypt.compare(password, userBase.password);

                    if(valid) {
                        const token = jwt.encode({...this.payload, ...{ user: userBase.email }}, process.env.SECRET);
                        const response = {
                            user: {
                                email: userBase.email,
                                username: userBase.username
                            },
                            token,
                            exp: this.payload.expires
                        };

                        Res.send(response, 200);
                        return;
                    } else {
                        Res.send({error: { msg: ERRORS.AUTH.WRONG_PASSWORD }}, 500);
                        return;
                    }
                } else {
                    Res.send({error: { msg: ERRORS.AUTH.NOT_FOUND}}, 400);
                    return;
                }
            } catch (e) {
                Res.send({error: { msg: ERRORS.UNKNOWN_ERROR, detail: e }}, 500);
                return;
            }
        } else {
            Res.send({ error: { msg: ERRORS.AUTH.INVALID } }, 400);
            return false;
        }
    };

    async checkToken(Req, Res, next) {
        if (!('authorization' in Req.headers)) {
            Res.send({ error: { msg: ERRORS.AUTH.UNAUTHORIZED } }, 400);
            return false;
        } else {
            const info = jwt.decode(Req.headers.authorization, process.env.SECRET);
            const user = await db.users.findOne({ where: { email: info.user }});

            if (moment(info.expires).utc().format() > moment().utc().format() && user) {
                next();
            } else {
                Res.send({ error: { msg: ERRORS.SESSION_EXPIRED } }, 403);
                return false;
            }
        }
    }
}

module.exports = new AuthMiddleware;

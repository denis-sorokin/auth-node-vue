const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');
const moment = require('moment');
const db = require('../../db/index');
const { ERRORS } = require('../../config/constants');


class AuthMiddleware {
    constructor() {
        this.payload = {
            expires: moment().utc().add({ hours: 3 }).format()
        };
    }

    async createToken(Req, Res) {
        if (Req.body.email && Req.body.password) {
            try {
                const userBase = await db.users.findOne({where: { email: Req.body.email } });
                if (userBase.email) {
                    bcrypt.compare(Req.body.password, userBase.password, function(err, res) {
                        if(res) {
                            const token = jwt.encode({...this.payload, ...{ user: userBase.email }}, process.env.SECRET);
                            Res.send({ user: {
                                    email: userBase.email,
                                    username: userBase.username
                                }, token, exp: this.payload.expires }, 200);
                            return;
                        } else {
                            Res.send({error: { msg: ERRORS.AUTH.WRONG_PASSWORD }}, 500);
                            return;
                        }
                    });
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

const moment = require('moment');
const jwt = require('jwt-simple');
const db = require('../../db');
const { ERRORS } = require('../../config/constants');

class AuthMiddleware {
    constructor() {
        this.payload = {
            expires: moment().utc().add({ hours: 3 }).format()
        };
    }

    passAuth(Req, Res, next) {
    }

    isAuth(Req, Res, next) {
        if(Req.isAuthenticated) {
            next();
        } else {
            Res.send(401)
        }
    }

    destroySession(Req, Res, next) {
        //
    }

    async checkToken(Req, Res, next) {
        if (!('authorization' in Req.headers)) {
            Res.send({ error: { msg: ERRORS.AUTH.UNAUTHORIZED } }, 400);
            return false;
        } else {
            const info = jwt.decode(Req.headers.authorization, process.env.SECRET);
            const user = await db.User.findOne({ where: { email: info.user }});

            if (moment(info.expires).utc().format() > moment().utc().format() && user) {
                next();
            } else {
                Res.send({ error: { msg: ERRORS.SESSION_EXPIRED } }, 403);
                return false;
            }
        }
    }

	async admin(Req, Res, next) {
		console.log(Req.auth);
        next()
	}
}

module.exports = new AuthMiddleware;

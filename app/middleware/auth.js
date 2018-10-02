const jwt = require('jwt-simple');
const moment = require('moment');
const models = require('../../db');
const { ERRORS } = require('../../config/constants');


class AuthMiddleware {
    constructor() {
        this.payload = {
            expires: moment().utc().add({ hours: 3 }).format()
        };
    }

    async checkToken(Req, Res, next) {
        if (!('authorization' in Req.headers)) {
            Res.send({ error: { msg: ERRORS.AUTH.UNAUTHORIZED } }, 400);
        } else {
            const info = jwt.decode(Req.headers.authorization, process.env.SECRET);
	        const user = await models.users.findOne({ email: info.user });

            if ((moment(info.expires).utc().format() > moment().utc().format()) && user) {
                next();
            } else {
	            Res.send({ error: { msg: ERRORS.SESSION_EXPIRED } }, 403);
            }
        }
    }

	async admin(Req, Res, next) {
		console.log(Req.auth);
        next()
	}
}

module.exports = new AuthMiddleware;

const jwt = require('jwt-simple');
const moment = require('moment');
const chalk = require('chalk');
const models = require('../../db');
const { ERRORS } = require('../../config/constants');


class AuthMiddleware {
    constructor(permission) {
        this.payload = {
            expires: moment().utc().add({ hours: 3 }).format()
        };
        this.reqPermission = permission
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

    havePermission(permission) {
    	return async (Req, Res, next) => {
	        console.log(permission);
	        try {
		        const info = jwt.decode(Req.headers.authorization, process.env.SECRET);
		        const user = await models.users.findOne({ email: info.user });
		        const access = (user.permission & permission) === permission;

	            if (access) {
	                next();
	            } else {
		            console.log(
			            chalk.bgRed(`User ${user.username} cannot read football players`)
		            );
		            Res.send({ error: { msg: ERRORS.NOT_HAVE_PERMISSION } }, 403);
	            }
	        } catch (err) {
		        Res.send({ error: { msg: ERRORS.UNKNOWN_ERROR } }, 500);
	        }
        }
    }

	async admin(Req, Res, next) {
		console.log(Req.auth);
        next()
	}
}

module.exports = new AuthMiddleware;

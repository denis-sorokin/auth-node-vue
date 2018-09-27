const models = require('../../db');
const { ERRORS } = require('../../config/constants');

class FootballController {
	constructor() {}

	async getUsers(Req, Res) {
		try {
			const users = await models.users.find().populate(['game']).exec();
			Res.send(users);
		} catch (e) {
			Res.send({error: { msg: ERRORS.UNKNOWN_ERROR, detail: e }}, 500);
		}
	};
}

module.exports = new FootballController();

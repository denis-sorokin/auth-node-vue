const models = require('../../db');
const { ERRORS } = require('../../config/constants');

class FootballController {
	constructor() {}

	async getUsers(Req, Res) {
		try {
			await models.users.find().populate('games').exec((err, users) => {
				if (err) {
					Res.send({error: { msg: ERRORS.FOOTBALL.CANNOT_GET_PLAYERS, detail: err }}, 500)
				}
				Res.send(users);
			});
		} catch (e) {
			Res.send({error: { msg: ERRORS.UNKNOWN_ERROR, detail: e }}, 500);
		}
	};
}

module.exports = new FootballController();

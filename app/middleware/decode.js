const encrypt = require('../utils/encrypt');

// decode Request.body, then send to passport.js
module.exports = function (Req, next) {
	try {
		Req.body = encrypt.getDataFront(Req.body);
		next();
	} catch (err) {
		console.error(err);
	}
};

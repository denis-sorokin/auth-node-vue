const encrypt = require('../utils/encrypt');

// decode Request.body, then send to passport.js
module.exports = function (Req, next) {
	Req.body = encrypt.getClientPassword(Req.body);
	next();
};

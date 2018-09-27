const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../app/middleware/auth');
const FootballController = require('../app/controller/football');

/* GET users list. */
router.get('/players',
	async function(Req, Res) {
		// AuthMiddleware.checkToken(Req, Res, next),
		FootballController.getUsers(Req, Res);
	}
);

module.exports = router;

const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../app/middleware/auth');
const FootballController = require('../app/controller/football');

/* GET players list. */
router.get('/players',
	async function(Req, Res) {
		// AuthMiddleware.checkToken(Req, Res, next),
		FootballController.getUsers(Req, Res);
	}
);

/* GET games list. */
router.get('/games',
	async function(Req, Res) {
		// AuthMiddleware.checkToken(Req, Res, next),
		FootballController.getGames(Req, Res);
	}
);

module.exports = router;

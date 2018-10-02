const express = require('express');
const router = express.Router();

const { PERMISSIONS } = require('../config/constants');

const AuthMiddleware = require('../app/middleware/auth');
const FootballController = require('../app/controller/football');

/* GET players list. */
router.get('/players',
	AuthMiddleware.checkToken.bind(AuthMiddleware),
	AuthMiddleware.havePermission(PERMISSIONS.FOOTBALL.CAN_READ).bind(AuthMiddleware),
	FootballController.getPlayers.bind(FootballController)
);

/* GET games list. */
router.get('/games',
	AuthMiddleware.checkToken.bind(AuthMiddleware),
	AuthMiddleware.havePermission(PERMISSIONS.FOOTBALL.CAN_READ).bind(AuthMiddleware),
	FootballController.getGames.bind(FootballController)
);

module.exports = router;

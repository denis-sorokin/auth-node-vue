const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../app/middleware/auth');
const AuthController = require('../app/controller/auth');

/* AUTH */
router.post('/login',
    async function(Req, Res) {
	    AuthController.createToken(Req, Res);
    }
);

router.post('/sign-up',
    async function(Req, Res) {
        AuthController.signUp(Req, Res);
    }
);

router.get('/check',
    async function(Req, Res, next) {
	    AuthMiddleware.checkToken(Req, Res, next);
	    AuthMiddleware.admin(Req, Res, next);
    }
);

module.exports = router;

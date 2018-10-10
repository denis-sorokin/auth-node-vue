const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../app/middleware/auth');
const UserController = require('../app/controller/user');

/* USERS */
router.post('/login',
    function(Req, Res) {
	    UserController.createToken(Req, Res);
    }
);

router.post('/sign-up',
    async function(Req, Res) {
        UserController.signUp(Req, Res);
    }
);

/* AUTH */
// router.get('/check',
//     async function(Req, Res, next) {
// 	    AuthMiddleware.checkToken(Req, Res, next);
// 	    AuthMiddleware.admin(Req, Res, next);
//     }
// );

module.exports = router;

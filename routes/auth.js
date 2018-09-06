const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../app/middleware/auth');

/* GET users list. */
router.post('/login',
    async function(Req, Res) {
        AuthMiddleware.createToken(Req, Res);
    }
);

router.get('/check',
    async function(Req, Res, next) {
        AuthMiddleware.checkToken(Req, Res, next);
    }
);

module.exports = router;

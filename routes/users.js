const express = require('express');
const router = express.Router();
const db = require('../db');
const AuthMiddleware = require('../app/middleware/auth');

/* GET users list. */
router.get('/',
    // AuthMiddleware.checkToken.bind(AuthMiddleware),
    async function(Req, Res) {
        await db.users.findAll().then(users => {
            Res.send(users, 200);
        })
        .catch(Error => {
            Res.send(Error, 500)
        })
    }
);

module.exports = router;

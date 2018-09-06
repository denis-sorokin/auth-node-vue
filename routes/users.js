const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../app/middleware/auth');

/* GET users list. */
router.post('/',
    AuthMiddleware.checkToken.bind(AuthMiddleware),
    function(Req, Res) {
        Res.send('bamboleilo list');
        return false;
    }
);

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(Req, Res) {
  Res.send({ msg: 'api menu' })
});

module.exports = router;

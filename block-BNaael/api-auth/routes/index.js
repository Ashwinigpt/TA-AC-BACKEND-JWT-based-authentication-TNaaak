var express = require('express');
var router = express.Router();

var auth = require('../middlewares/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({ message: 'Welcome to Application' });
});

router.get('/protected', auth.verifyToken, (req, res) => {
  console.log(req.user);
  res.json({ access: "Protected resources"});
})

module.exports = router;

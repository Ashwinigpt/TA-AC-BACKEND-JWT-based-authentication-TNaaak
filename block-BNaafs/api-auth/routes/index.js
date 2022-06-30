var express = require('express');
var router = express.Router();

var auth = require('../middlewares/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({ message: 'Welcome to Application' });
});

router.get('/dashboard', auth.verifyToken, (req, res) => {
  console.log(req.user);
  res.json({ access: "dashboard resources"});
})

module.exports = router;

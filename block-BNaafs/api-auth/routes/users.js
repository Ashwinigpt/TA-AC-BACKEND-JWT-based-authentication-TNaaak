var express = require('express');
const User = require('../models/User');
var router = express.Router();
var auth = require('../middlewares/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({ message: "Users information" });
});

// registration handler
router.post('/register', async (req, res, next) => {
  try {
    var user = await User.create(req.body);
    res.status(201).json({
      name: user.name,
      message: 'Registered Succesfully',
    });
  } catch (error) {
    if (error) {
      if (error.code === 11000) {
        return res
          .status(400)
          .json({ error: 'This Email is already registered...' });
      }
      if (error.name === 'ValidationError') {
        return res
          .status(400)
          .json({ error: 'Enter a valid and strong Password...' });
      }
    }
  }
});

//login handler
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email/Password is missing' });
  }
  try {
    var user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Email not registered' });
    }
    var result = await user.verifyPassword(password);
    if (!result) {
      return res.status(400).json({ error: 'Wrong password' });
    }
    var token = await user.signToken();
    res.json({ user: user.userJSON(token) });
  } catch (error) {
    next(error);
  }
});

// Protected Route
router.get('/dashboard', auth.verifyToken, (req, res, next) => {
  res.json({ acess: 'Dashboard Accessed...!' });
});

module.exports = router;

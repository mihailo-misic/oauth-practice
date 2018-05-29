const router = require('express').Router();
const smartPassport = require('../config/passport-setup');

// Auth login
router.get('/login', (req, res) => {
  res.render('login', { user: req.user });
});

// Auth logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Auth with twitter
router.get('/twitter', smartPassport.authenticate('twitter', { session: false }));
router.get('/twitter/callback',
  smartPassport.authenticate('twitter', {
    successRedirect: '/profile',
    failureRedirect: '/auth/login'
  }));

module.exports = router;

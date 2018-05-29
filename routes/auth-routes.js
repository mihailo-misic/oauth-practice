const router = require('express').Router();
const passport = require('../config/passport-setup');

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
router.get('/twitter', passport.authenticate('twitter', { session: false }));
router.get('/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: '/profile',
    failureRedirect: '/auth/login'
  }));

// Auth with twitch
router.get('/twitch', passport.authenticate('twitch', { session: false }));
router.get('/twitch/callback',
  passport.authenticate('twitch', {
    successRedirect: '/profile',
    failureRedirect: '/auth/login'
  }));

module.exports = router;

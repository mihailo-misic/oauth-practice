const router = require('express').Router();
const passport = require('passport');

// Auth login
router.get('/login', (req, res)=>{
	res.render('login');
});

// Auth logout
router.get('/logout', (req, res)=>{
	// handle logout
	res.send('logging out');
});

// Auth with twitter
router.get('/twitter', passport.authenticate('twitter', {session:false}));
router.get('/twitter/callback',
	passport.authenticate('twitter', {
		successRedirect: '/',
		failureRedirect: '/auth/login'
	}),
	(req, res)=>{

	});

module.exports = router;

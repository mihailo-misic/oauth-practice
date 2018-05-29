const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

const { twitter } = require('./keys');

passport.use(new TwitterStrategy({
    consumerKey: twitter.CLIENT_ID,
    consumerSecret: twitter.CLIENT_SECRET,
    callbackURL: 'http://127.0.0.1:3000/auth/twitter/callback'
  },
  (token, tokenSecret, profile, done) => {
    console.log(token)
  }
));

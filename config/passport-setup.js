const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/user-model');

const { twitter } = require('./keys');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

const smartPassport = passport.use(new TwitterStrategy({
    consumerKey: twitter.CLIENT_ID,
    consumerSecret: twitter.CLIENT_SECRET,
    callbackURL: 'http://127.0.0.1:3000/auth/twitter/callback'
  },
  (token, tokenSecret, profile, done) => {
    const twitterId = profile['id'];
    const username = profile['displayName'];
    const thumbnail = profile._json['profile_image_url'];

    User
      .findOneOrCreate({ twitterId }, new User({ username, twitterId, thumbnail}))
      .then((newUser) => {
        done(null, newUser);
      })
      .catch(err => done(err));
  }));

module.exports = smartPassport;

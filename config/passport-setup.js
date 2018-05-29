const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const TwitchStrategy = require('passport-twitch').Strategy;
const User = require('../models/user-model');

const { twitter, twitch } = require('./keys');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Twitter Strategy
passport.use(new TwitterStrategy({
    consumerKey: twitter.CLIENT_ID,
    consumerSecret: twitter.CLIENT_SECRET,
    callbackURL: 'http://127.0.0.1:3000/auth/twitter/callback',
  },
  (token, tokenSecret, profile, done) => {
    const twitterId = profile['id'];
    const username = profile['displayName'];
    const thumbnail = profile._json['profile_image_url'];

    User
      .findOneOrCreate({ twitterId }, new User({ username, twitterId, thumbnail }))
      .then((newUser) => {
        done(null, newUser);
      })
      .catch(err => done(err));
  }));

// Twitch Strategy
passport.use(new TwitchStrategy({
    clientID: twitch.CLIENT_ID,
    clientSecret: twitch.CLIENT_SECRET,
    callbackURL: 'http://127.0.0.1:3000/auth/twitch/callback',
    scope: 'user_read',
  },
  (token, tokenSecret, profile, done) => {
    const twitchId = profile['id'];
    const username = profile['displayName'];
    const thumbnail = profile._json['logo'];

    User
      .findOneOrCreate({ twitchId }, new User({ username, twitchId, thumbnail }))
      .then((newUser) => {
        done(null, newUser);
      })
      .catch(err => done(err));
  }));

module.exports = passport;

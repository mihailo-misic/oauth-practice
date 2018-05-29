const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const { session, mongodb } = require('./config/keys');

const app = express();

// Set up view engine
app.set('view engine', 'ejs');

// Set up cookies
app.use(cookieSession({
  maxAge: 60 * 60 * 1000, // 1h
  keys: [session.KEY],
}));

// Set up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect(mongodb.URI, () => {
  console.log('connected to mongodb');
}).catch(console.error);

// Set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.get('/', (req, res) => {
  res.render('home', { user: req.user });
});

// Serve
app.listen(3000, () => {
  console.log('app now listening for requests on port 3000');
});

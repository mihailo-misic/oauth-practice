const express = require('express');
const session = require('express-session');
const authRoutes = require('./routes/auth-routes')
const passportSetup = require('./config/passport-setup');
// const passport = require('passport');
const mongoose = require('mongoose');
const {mongodb} = require('./config/keys');

const app = express();

// Set up view engine
app.set('view engine', 'ejs');

// Use sessions
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true,
}));

// Connect to MongoDB
mongoose.connect(mongodb.URI, ()=>{
	console.log('connected to mongodb')
})

// Set up routes
app.use('/auth', authRoutes);

// Create home route
app.get('/', (req, res)=>{
	res.render('home');
});

// Serve
app.listen(3000, ()=>{
	console.log('app now listening for requests on port 3000')
});

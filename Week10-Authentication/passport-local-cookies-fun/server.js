const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session')

const LocalStrategy = require('passport-local').Strategy;

const User = require('./userSchema')
mongoose.connect('mongodb://localhost/passport-fun', {
  useNewUrlParser: true
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(cookieSession({
  name: 'session',
  keys: ['helloworld'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use('login', new LocalStrategy((userInput, password, done) => {
  // const authenticated = username === "John" && password === "Smith";

  const existingUser = User.findOne({ username: userInput }).exec((err, user) => {
    if (err) {
      return err
    } else if (user.validPassword(password)) {
      console.log('Success!')
      return done(null, { myUser: userInput, myID: 1234 });
    } else {
      console.log('Invalid')
      return done(null, false);
    }
  });

  // const validPassword = existingUser.validPassword(password);

  // if (existingUser && validPassword) {
  //   return done(null, { myUser: username, myID: 1234 });
  // } else {
  //   return done(null, false);
  // }
}));

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/register.html');
})

app.post('/register', (req, res) => {
  let user = new User()
  user.username = req.body.username
  user.setPassword(req.body.password)
  user.save((err) => {
    if (err) throw err
  })
  res.end()
})

app.post('/login', passport.authenticate('login', {
  successRedirect: '/success',
  failureRedirect: '/login'
}));


app.get('/success', (req, res) => {
  if (!req.isAuthenticated()) { // Denied. Redirect to login
    console.log('DEEEnied')
    res.redirect('/login');
  } else {
    res.send('Hey, hello from the server!');
  }
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.send('Logged out!');
});

app.listen(8000)
const express = require('express');
const app = express();
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jwt-simple');

const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;

const tokenForUser = function(user) {
  return jwt.encode({
    sub: user.myID,
    iat: Math.round(Date.now() / 1000),
    exp: Math.round(Date.now() / 1000 + 5 * 60 * 60)
  }, 'bananas');
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());

const requireSignin = passport.authenticate('login', { session: false });

passport.use('login', new LocalStrategy(function(username, password, done) {
  const authenticated = username === "John" && password === "Smith";

  if (authenticated) {
    return done(null, { myUser: 'user', myID: 1234 });
  } else {
    return done(null, false);
  }
}));

app.post('/login', requireSignin, function(req, res, next) {
  res.send({
    token: tokenForUser(req.user),
  });
});

app.get('/login', function(req, res) {
  res.sendFile(__dirname + '/login.html');
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'bananas'
};

passport.use('jwt', new JwtStrategy(jwtOptions, function(payload, done) {
  return done(null, { myUser: 'user', myID: payload.sub })
}));

const requireAuth = passport.authenticate('jwt', { session: false });

app.get('/protected', requireAuth, function(req, res) {
  res.send('Access Granted!');
});

app.listen(8000)
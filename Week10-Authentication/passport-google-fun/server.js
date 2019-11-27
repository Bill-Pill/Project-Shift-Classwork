const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const User = require('./user')

const app = express()

mongoose.connect('mongodb://localhost/google-passport-fun')

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ['helloworld']
  })
)

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  console.log(id)
  done(null, id)
})

passport.use(
  new GoogleStrategy({
      clientID: '227161524310-4qm1md55posh5d9j2voujqb5muccb0ut.apps.googleusercontent.com',
      clientSecret: '7eMiVuXZhvKTDp6tGmGGFCh4',
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {

      const foundUser = User.findOne({ googleId: profile.id })

      foundUser.exec((err, user) => {
        if (err) {
          console.log(err)
        } else if (user) {
          done(null, user)
        } else {
          const newUser = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value
          })
          newUser.save()
          done(null, newUser)
        }
      })
    }
  )
)

const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email']
})

app.get('/auth/google', googleAuth)

app.get('/auth/google/callback', googleAuth, (req, res) => {
  res.send('Your logged in via Google!')
})

// app.get('/api/current_user', (req, res) => {
//   res.send(req.user)
// })

// app.get('/api/logout', (req, res) => {
//   req.logout()
//   res.send(req.user)
// })

app.listen(5000)
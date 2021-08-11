const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const passport = require('passport')

const Users = require('../models/users.models')
const isValidPassword = require('../helpers/isValidPassword')
const createHash = require('../helpers/createHash')

passport.serializeUser(function(user, done) {
  done(null, user);
})

passport.deserializeUser(function(user, done) {
  done(null, user);
})


passport.use(new FacebookStrategy({
    clientID:  process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'emails'],
    scope: ['email']
  },
  (accesToken, refreshToken, profile, done) => {
      // console.log(profile)

      done(null, profile)
    })
  

)

// passport.use('login', new LocalStrategy({
//     passReqToCallback: true
//   },
//   (req, username, password, done) => {
//     Users.findOne({'username': username}, (err, user) => {

//       if(err) {
//         return done(err)
//       }

//       if(!user) {
//         return done(null, false, console.log('User not found'))
//       }

//       if(user.password !== password) {
//         return done(null, false, console.log('Invalid password'))
//       }

//       return done(null, user)
//     })
//   })
// )


// passport.use('signup', new LocalStrategy({
//     passReqToCallback: true
//   },
//   (req, username, password, done) => {
//     let userExists = false
//     Users.findOne({'username': username}, (err, user) => {

//       if(user) {
//         userExists = true
//         return done(null, false, console.log('User already exists'))
//       }
//     })

//     if(!userExists) {
//       const user = {username, password: password}
//       Users.create(user)
//       return done(null, user)
//     }
//   })
// )


module.exports = passport
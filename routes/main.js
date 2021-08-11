const express = require('express')
const passportMiddleware = require('../middlewares/passport')

const { GETmain, GETlogin, POSTlogin, GETsignup, POSTsignup, GETfail, GETlogout } = require('../controllers/main')

const router = express.Router()


// MAIN
router.get('/', GETmain)

// LOGIN
router.get('/login', GETlogin)
router.post('/login', passportMiddleware.authenticate('login', {failureRedirect: '/fail'}), POSTlogin)


// SIGNUP
router.get('/signup', GETsignup)
router.post('/signup', passportMiddleware.authenticate('signup', {failureRedirect: '/fail'}), POSTsignup)

// FAIL 
router.get('/fail', GETfail)

// LOGOUT
router.get('/logout', GETlogout)
module.exports = router

// AUTH FACEBOOK
router.get('/auth/facebook', passportMiddleware.authenticate('facebook'))

router.get('/auth/facebook/callback', passportMiddleware.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/fail'
}))

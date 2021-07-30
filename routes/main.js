const express = require('express')

const { loginView, loginPost, logout } = require('../controllers/main')

const router = express.Router()

router.get('/login', loginView)
router.post('/login', loginPost)
router.get('/logout', logout)

module.exports = router
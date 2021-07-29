const express = require('express')

const { mainView, testView } = require('../controllers/productos')

const router = express.Router()

router.get('/vista', mainView)
router.get('/vista-test', testView)

module.exports = router
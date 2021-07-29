const express = require('express')

const { getAll, getById, save, updateById, deleteById } = require('../controllers/api')

const router = express.Router()

router.get('/productos/listar', getAll)
router.get('/productos/listar/:id', getById)
router.post('/productos/guardar', save)
router.put('/productos/actualizar/:id', updateById)
router.delete('/productos/borrar/:id', deleteById)
  
module.exports = router
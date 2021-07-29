const ProductosDB = require('../models/productos.models')
const productosDB = new ProductosDB()
productosDB.init()

const getAll = async (req, res) => {
  try {
    return res.json(await productosDB.obtenerProductos())
  } catch({message}) {
    console.log(message)
    return res.json({error: message})
  }
}

const getById = async (req, res) => {
  try {
    return res.json(await productosDB.obtenerProducto(req.params.id))
  } catch({message}) {
    console.log(message)
    return res.json({error: message})
  }
}

const save = async (req, res) => {
  await productosDB.almacenarProducto(req.body)
  return res.redirect('/')
}

const updateById = async (req, res) => {
  try {
    return res.json(await productosDB.actualizarProducto(req.params.id, req.body))
  } catch({message}) {
    console.log(message)
    return res.json({error: message})
  }
}

const deleteById = async (req, res) => {
  try {
    return res.json(await productosDB.borrarProducto(req.params.id))
  } catch({message}) {
    console.log(message)
    return res.json({error: message})
  }
}

module.exports = {
  getAll,
  getById,
  save,
  updateById,
  deleteById
}
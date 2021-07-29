const faker = require('faker');

const ProductosDB = require('../models/productos.models')
const productosDB = new ProductosDB()
productosDB.init()

const mainView = async (req, res) => {
  try {
    return res.render('main', {data: await productosDB.obtenerProductos(), error: null})
  } catch({message}) {
    return res.render('main', {error: message, data: null})
  }
}

const testView = async (req, res) => {
  let amount = req.query.cant || 10

  if(amount == 0) {
    return res.render('main', {
      data: null,
      error: 'No hay productos'
    })
  }

  const data = []
  for(let i = 0; i <= amount; i++ ) {
    data.push({
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      thumbnail: faker.image.image()
    })
  }

  return res.render('main', {
    data,
    error: null
  })
}

module.exports = {
  mainView,
  testView
}


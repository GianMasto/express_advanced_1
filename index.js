const express = require('express')

const Productos = require('./Productos')

const app = express()
const port = 8080
const productos = new Productos()

app.use(express.json());


app.get('/api/productos/listar', (req, res) => {

  try {

    return res.json(productos.obtenerProductos())

  } catch({message}) {

    console.log(message)
    return res.json({error: message})

  }
})


app.get('/api/productos/listar/:id', (req, res) => {

  try {

    return res.json(productos.obtenerProducto(req.params.id))

  } catch({message}) {

    console.log(message)
    return res.json({error: message})

  }
})


app.post('/api/productos/guardar', (req, res) => {

  return res.send(productos.almacenarProducto(req.body))

})


const server = app.listen(port, () => {
  console.log(`Servidor corriendo en puerto:${port}`)
})

server.on('error', error =>  console.error(`Error en el server ${error}`))
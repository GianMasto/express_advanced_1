const express = require('express')

const Productos = require('./Productos')

const app = express()
const port = 8080
const productos = new Productos()

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))


app.set('view engine', 'ejs')

app.set('views', './views')



app.use(express.static('public'))


const routerApi = express.Router('/api');
app.use('/api', routerApi)

const routerProductos = express.Router('/productos');
app.use('/productos', routerProductos)


routerApi.get('/productos/listar', (req, res) => {

  try {

    return res.json(productos.obtenerProductos())

  } catch({message}) {

    console.log(message)
    return res.json({error: message})

  }
})


routerApi.get('/productos/listar/:id', (req, res) => {

  try {

    return res.json(productos.obtenerProducto(req.params.id))

  } catch({message}) {

    console.log(message)
    return res.json({error: message})

  }
})


routerApi.post('/productos/guardar', (req, res) => {
  productos.almacenarProducto(req.body)
  return res.redirect('/')

})

routerApi.put('/productos/actualizar/:id', (req, res) => {

  try {

    return res.json(productos.actualizarProducto(req.params.id, req.body))

  } catch({message}) {

    console.log(message)
    return res.json({error: message})

  }
})


routerApi.delete('/productos/borrar/:id', (req, res) => {

  try {

    return res.json(productos.borrarProducto(req.params.id))

  } catch({message}) {

    console.log(message)
    return res.json({error: message})

  }
})


routerProductos.get('/vista', (req, res) => {
  try {
    return res.render('main', {data: productos.obtenerProductos(), error: null})

  } catch({message}) {

    return res.render('main', {error: message, data: null})


  }
})


const server = app.listen(port, () => {
  console.log(`Servidor corriendo en puerto:${port}`)
})

server.on('error', error =>  console.error(`Error en el server ${error}`))
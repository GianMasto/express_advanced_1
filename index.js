const express = require('express')

const Productos = require('./Productos')
const Archivo = require('./Archivo')
const { log } = require('console')

const app = express()
const port = 8080

const http = require('http').Server(app)
const io = require('socket.io')(http)

const ProductosDB = require('./models/productos.models')
const productosDB = new ProductosDB()
productosDB.init()

const MensajesDB = require('./models/mensajes.models')
const mensajesDB = new MensajesDB()
mensajesDB.init()



const archivoMensajes = new Archivo('mensajes.txt')
archivoMensajes.escribirArchivo('[]')

io.on('connection', async socket => {
  try {
    io.sockets.emit('productos', await productosDB.obtenerProductos())
  } catch({message}) {
    io.sockets.emit('productos', {error: message})
  }

  try {
    socket.emit('mensajes', await mensajesDB.obtenerMensajes()) 
  } catch({message}) {
    socket.emit('mensajes', {error: message})
  }


  socket.on('actualizacion', async (data) => {
    try {
      io.sockets.emit('productos', await productosDB.obtenerProductos())
    } catch({message}) {
      io.sockets.emit('productos', {error: message})
    }
  })

  socket.on('message', async data => {
      try {
        const mensajes  = await mensajesDB.agregarMensaje(data)
        io.sockets.emit('mensajes', mensajes)

      } catch({message}) {
        io.sockets.emit('mensajes', {error: message})
      }
  })

})


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


routerApi.get('/productos/listar', async (req, res) => {

  try {

    return res.json(await productosDB.obtenerProductos())

  } catch({message}) {

    console.log(message)
    return res.json({error: message})

  }
})


routerApi.get('/productos/listar/:id', async (req, res) => {

  try {

    return res.json(await productosDB.obtenerProducto(req.params.id))

  } catch({message}) {

    console.log(message)
    return res.json({error: message})

  }
})


routerApi.post('/productos/guardar', async (req, res) => {
  await productosDB.almacenarProducto(req.body)
  return res.redirect('/')

})

routerApi.put('/productos/actualizar/:id', async (req, res) => {

  try {

    return res.json(await productosDB.actualizarProducto(req.params.id, req.body))

  } catch({message}) {

    console.log(message)
    return res.json({error: message})

  }
})


routerApi.delete('/productos/borrar/:id', async (req, res) => {

  try {

    return res.json(await productosDB.borrarProducto(req.params.id))

  } catch({message}) {

    console.log(message)
    return res.json({error: message})

  }
})


routerProductos.get('/vista', async (req, res) => {
  try {
    return res.render('main', {data: await productosDB.obtenerProductos(), error: null})

  } catch({message}) {

    return res.render('main', {error: message, data: null})


  }
})

const server = http.listen(port, () => {
  console.log(`Servidor corriendo en puerto:${port}`)
})

server.on('error', error =>  console.error(`Error en el server ${error}`))
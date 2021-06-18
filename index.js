const express = require('express')

const Productos = require('./Productos')
const Archivo = require('./Archivo')
const { log } = require('console')

const app = express()
const port = 8080

const http = require('http').Server(app)
const io = require('socket.io')(http)

const productos = new Productos()
const archivoMensajes = new Archivo('mensajes.txt')
archivoMensajes.escribirArchivo('[]')

io.on('connection', async socket => {
  try {
    io.sockets.emit('productos', productos.obtenerProductos())
  } catch({message}) {
    io.sockets.emit('productos', {error: message})
  }

  try {
    socket.emit('mensajes', JSON.parse(await archivoMensajes.obtenerArchivo())) 
  } catch({message}) {
    socket.emit('mensajes', {error: message})
  }


  socket.on('actualizacion', data => {
    try {
      io.sockets.emit('productos', productos.obtenerProductos())
    } catch({message}) {
      io.sockets.emit('productos', {error: message})
    }
  })

  socket.on('message', async data => {
      try {
        const mensajesObj = JSON.parse(await archivoMensajes.obtenerArchivo()) 
        let nuevosMensajes = JSON.stringify([...mensajesObj, data])
        io.sockets.emit('mensajes', JSON.parse(await archivoMensajes.escribirArchivo(nuevosMensajes)))

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


const server = http.listen(port, () => {
  console.log(`Servidor corriendo en puerto:${port}`)
})

server.on('error', error =>  console.error(`Error en el server ${error}`))
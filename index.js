require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')
const compression = require('compression')

const passportMiddleware = require('./middlewares/passport')

const apiRouter = require('./routes/api')
const productosRouter = require('./routes/productos')
const mainRouter = require('./routes/main')

const authMiddleware = require('./middlewares/auth')

const normalizeMessages = require('./helpers/normalizeMessages')

const mensajesController = require('./models/mensajes.models')




const app = express()
app.use(compression())
const port = process.env.PORT || process.argv[2] || 8080

const http = require('http').Server(app)
const io = require('socket.io')(http);

const ProductosDB = require('./models/productos.models')
const productosDB = new ProductosDB()
productosDB.init()


mongoose.connect('mongodb://localhost:27017/ecommerce3', {useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection.on('connected', () => {
  console.log('[Mongoose] - connected')
});

mongoose.connection.on('error', (err) => {
  console.log('[Mongoose] - error:', err)
});


io.on('connection', async socket => {
  try {
  const messagesFromMongo = await mensajesController.findAll()
  const normalizedMessages = normalizeMessages(messagesFromMongo)


    socket.emit('mensajes', normalizedMessages) 
  } catch({message}) {
    socket.emit('mensajes', {error: message})
  }

  socket.on('message', async data => {
      try {
        await mensajesController.create(data)

        const messagesFromMongo = await mensajesController.findAll()
        const normalizedMessages = normalizeMessages(messagesFromMongo)

        io.sockets.emit('mensajes', normalizedMessages)

      } catch({message}) {
        io.sockets.emit('mensajes', {error: message})
      }
  })

})


app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(cookieParser())
app.use(session({
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://gian:gian@cluster0.o9qpe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
    ttl: 10
  }),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

app.use(passportMiddleware.initialize())
app.use(passportMiddleware.session())

// app.use(authMiddleware)


app.set('view engine', 'ejs')
app.set('views', './views')


// app.use(express.static('public'))

app.use('/', mainRouter)
app.use('/api', apiRouter)
app.use('/productos', productosRouter)


const server = http.listen(port, () => {
  console.log(`Servidor corriendo en puerto:${port}`)
})

server.on('error', error =>  console.error(`Error en el server ${error}`))

process.on('exit', code => console.log(`Server about to exit with code: ${code}`))
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'coderhouse'
  }
});

module.exports = class ProductosDB {
  constructor() {}


  async init() {
      // try {
      //   const tableExists = await knex.schema.hasTable('productos')
      //   if(!tableExists) {
      //     return knex.schema.createTable('productos', t => {
      //       t.increments('id'),
      //       t.string('title'),
      //       t.float('price'),
      //       t.string('thumbnail')
      //     })

      //   }
    
    
      // } catch (error) {
      //   throw new Error(error)
      // }

      console.log('descomentar lineas para iniciar mysql');
  }

  async checkForErrors(id) {
    const productos = await knex.select().table('productos')

    if(productos.length === 0) {
      throw new Error('no hay productos cargados')
    }

    if(id) {
      const producto = await knex.select().table('productos').where('id', id)

      if(producto.length === 0) {
        throw new Error('producto no encontrado')
      }
    }
  }

  async obtenerProductos() {
    this.checkForErrors()

    const productos = await knex.select().table('productos')
    
    return productos;
  }

  async obtenerProducto(id) {
    this.checkForErrors(id)
    
    const producto = await knex.select().table('productos').where('id', id)

    return producto[0];
  }

  async almacenarProducto({title, price, thumbnail}) {

    const productoId = await knex('productos').insert({
      title,
      price,
      thumbnail,
    })

    return this.obtenerProducto(productoId[0])
  }

  async actualizarProducto(id, object) {
    this.checkForErrors(id)

    await knex('productos').update(object).where('id', id)

    return this.obtenerProducto(id)
  }


  async borrarProducto(id) {
    this.checkForErrors(id)

    const producto = await this.obtenerProducto(id);
   await knex('productos').del().where('id', id)

    return producto
  }
}


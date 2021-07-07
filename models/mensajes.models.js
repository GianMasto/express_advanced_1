const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './db/mensajes.sqlite'
  },
  useNullAsDefault: true
});

module.exports = class MensajesDB {
  constructor() {}

  async init() {
    try {
      const tableExists = await knex.schema.hasTable('mensajes')
      if(!tableExists) {
        return knex.schema.createTable('mensajes', t => {
          t.string('email'),
          t.string('message'),
          t.integer('date')
        })

      }
  
  
    } catch (error) {
      throw new Error(error)
    }
  }

  async agregarMensaje({email, message}) {
    await knex('mensajes').insert({
      email,
      message,
      date: Date.now(),
    })

    return this.obtenerMensajes()
  }

  async obtenerMensajes() {
    const mensajes = await knex.select().table('mensajes')
    
    return mensajes;
  }

  async borrarMensajes() {
    await knex('mensajes').del()
  }
}
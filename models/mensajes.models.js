const mongoose = require('mongoose')

const MensajeSchema = new mongoose.Schema({
  author: {
    id: {type: String, require: true},
    nombre: {type: String, require: true},
    apellido: {type: String, require: true},
    edad: {type: Number, require: true},
    alias: {type: String, require: true},
    avatar: {type: String, require: true}
  },
  text: {type: String, require: true},
  date: {type: Number, require: true}
})

const MensajesMongo = mongoose.model('mensajes', MensajeSchema)

class MongoCRUD {

  constructor(model) {
      this.model = model;
  }

  getModel() {
      return this.model;
  }

  async create(data) {
      return this.model.create(data);
  }

  async findById(id) {
      return this.model.findById(id);
  }

  findAll() {
      return this.model.find({});
  }

  update(id, toUpdate) {
      return this.model.findByIdAndUpdate(id, toUpdate);
  }

  remove(id) {
      return this.model.findByIdAndDelete(id);
  }
}

class MensajesController extends MongoCRUD {
  constructor() {
    super(MensajesMongo)
  }
}

module.exports = new MensajesController();
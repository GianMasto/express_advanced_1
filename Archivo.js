fs = require('fs').promises;
path = require('path');

module.exports = class Archivo{
  
  constructor(filename) {
    this.filename = path.join(__dirname, filename)
  }

  async escribirArchivo(text) {
    try {
      await fs.writeFile(this.filename, text, 'utf-8')
      return await this.obtenerArchivo()
    } catch({message}) {
      throw new Error(message)
    }
  }

  async obtenerArchivo() {
    try {
      return await fs.readFile(this.filename, 'utf-8')
    } catch({message}) {
      throw new Error(message)
    }
  }
}
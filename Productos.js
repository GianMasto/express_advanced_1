module.exports = class Productos{

  constructor() {
    this.productosArray = []
  }

  obtenerProductos() {
    if(this.productosArray.length === 0) {
      throw new Error('no hay productos cargados')
    }
    
    return this.productosArray;
  }


  obtenerProducto(id) {
    if(this.productosArray.length === 0) {
      throw new Error('no hay productos cargados')
    }

    const producto = this.productosArray.find(p => p.id == id)

    if(!producto) {
      throw new Error('producto no encontrado')
    }

    return producto;
  }
  

  almacenarProducto({title, price, thumbnail}) {
    const producto = {
      id: this.productosArray.length + 1,
      title,
      price,
      thumbnail,
    }

    this.productosArray.push(producto)

    return producto
  }

  actualizarProducto(id, {title, price, thumbnail}) {
    const productoIndex = this.productosArray.findIndex(p => p.id == id )
    
    if(productoIndex === -1) {
      throw new Error('producto no encontrado')
    }

    const productoActualizado = {
      id,
      title,
      price,
      thumbnail
    }

    this.productosArray[productoIndex] = productoActualizado

    return productoActualizado
  }

  borrarProducto(id) {
    const productoIndex = this.productosArray.findIndex(p => p.id == id )

    if(productoIndex === -1) {
      throw new Error('producto no encontrado')
    }

    return this.productosArray.splice(productoIndex, 1)[0]
  }
}
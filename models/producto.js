let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productoSchema = new Schema({
    titulo: String,
    descripcion: String,
    precio: Number,
    activo: Boolean,
    departamento: String
});

//metodo estático
// Producto.activos((err, productos) => {})
productoSchema.statics.activos = function (callback) {
    this.model('Producto').find({ activo: true }, callback)
}

//método 
productoSchema.methods.mismoDepartamento = function (callback) {
    console.log(this.departamento);
    this.model('Producto').find({ departamento: this.departamento }, callback) //modelo.metodofinde.({filtro}, callback) //el find devuelve siempre un array
}




module.exports = mongoose.model('Producto', productoSchema);

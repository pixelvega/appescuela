let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let personaSchema = new Schema({
    nombre: String,
    apellidos: String,
    edad: Number,
    producto: { type: Schema.Types.ObjectId, ref: 'Producto' },
    productos: [{ type: Schema.Types.ObjectId, ref: 'Producto' }]
});

//creamos el get de la propiedad computada (calculos sobre otras propiedades existentes en la db) nombre_completo
//cada vez que accedes a nombre_completo te dará las propiedades
personaSchema.virtual('nombre_completo').get(function () {
    return this.nombre + " " + this.apellidos;
})
//ahora tendrá nombre, apellidos, edad y nombre_completo
personaSchema.virtual('nombre_completo').set(function () {
    let arr = value.split(' ');
    this.nombre = arr[0];
    this.apellidos = arr[1];
})

module.exports = mongoose.model('Persona', personaSchema);
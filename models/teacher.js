let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let teacherSchema = new Schema({
  nombre: String,
  apellidos: String,
  dni: String,
  edad: Number,
  departamento: String,
  operativo: Boolean
})

module.exports = mongoose.model('Teacher', teacherSchema);
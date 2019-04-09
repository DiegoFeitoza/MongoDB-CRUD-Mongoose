const mongoose = require('mongoose')
var Schema = mongoose.Schema

var userDataSchema = new Schema({  
    nome: {type: String, required: true},  
    email: {type: String,  required: true, default: null, message: "E-Mail não enviado"}
   }, {collection: 'usuarios'})
module.exports = mongoose.model('Usuarios', userDataSchema)
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true },
  senha: { type: String, required: true }, // guarda o HASH, nunca a senha crua
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true }
}, { collection: 'users' });

module.exports = mongoose.model('Usuario', usuarioSchema);
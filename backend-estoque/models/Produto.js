const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  codigo: { type: String, required: true, unique: true },
  nome: { type: String, required: true },
  quantidade: { type: Number, required: true, default: 0 },
  categoria: {
    type: String,
    required: true,
    enum: ['Alimentos', 'Bebidas', 'Doces', 'Castanhas', 'Mel', 'Artesanato', 'Outros'],
    default: 'Outros'
  }
}, { collection: 'Produto' });

module.exports = mongoose.model('Produto', produtoSchema);
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const produtoRoutes = require('./routes/produtoRoutes');

const app = express();

app.use(cors()); // libera acesso do Angular (que roda em outra porta)
app.use(express.json());

// String de conexão - ajuste conforme sua conexão no Compass
mongoose.connect('mongodb://localhost:27017/Loja')
  .then(() => console.log('Conectado ao MongoDB - banco Loja'))
  .catch(err => console.error('Erro ao conectar:', err));

app.use('/produto', produtoRoutes);

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));

const usuarioRoutes = require('./routes/usuarioRoutes');
app.use('/users', usuarioRoutes);

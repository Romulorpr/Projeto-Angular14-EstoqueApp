const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Usuario = require('../models/Usuario');

// POST /users - cadastro 
router.post('/', async (req, res) => {
  try {
    const { login, senha, nome, email } = req.body;
    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = new Usuario({ login, senha: senhaHash, nome, email });
    const resultado = await novoUsuario.save();

    // nunca devolver a senha, nem o hash, na resposta
    res.status(201).json({
      insertedId: resultado._id,
      login: resultado.login,
      nome: resultado.nome,
      email: resultado.email
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /users/login - autenticação 
router.post('/login', async (req, res) => {
  try {
    const { login, senha } = req.body;
    const usuario = await Usuario.findOne({ login });

    if (!usuario) {
      return res.status(401).json({});
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({});
    }


    res.json({
      _id: usuario._id,
      login: usuario.login,
      nome: usuario.nome,
      email: usuario.email
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');

// GET - obterTodos()
router.get('/', async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - adicionar()
router.post('/', async (req, res) => {
  try {
    const novoProduto = new Produto(req.body);
    const resultado = await novoProduto.save();
    res.status(201).json({ insertedId: resultado._id, ...resultado.toObject() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - remover()
router.delete('/:id', async (req, res) => {
  try {
    const resultado = await Produto.findByIdAndDelete(req.params.id);
    res.json({ deletedCount: resultado ? 1 : 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /produto/:id - buscar um produto específico
router.get('/:id', async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.json(produto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - atualizar()
router.put('/:id', async (req, res) => {
  try {
    const atualizado = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH - atualizarParcial()
router.patch('/:id', async (req, res) => {
  try {
    const atualizado = await Produto.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // só atualiza os campos enviados
      { new: true }
    );
    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

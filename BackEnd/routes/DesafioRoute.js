const express = require('express');
const router = express.Router();
const { criarDesafio, listarDesafios } = require('../controllers/desafioController');

// Criar um novo desafio
router.post('/', criarDesafio);

// Listar todos os desafios
router.get('/', listarDesafios);

module.exports = router;

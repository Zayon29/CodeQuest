const express = require('express');
const router = express.Router();
const { criarDesafio, listarDesafios, desafioAtual } = require('../controllers/desafioController');

router.post('/', criarDesafio);
router.get('/', listarDesafios);
router.get('/desafioAtual', desafioAtual);

module.exports = router;
const express = require('express');
const router = express.Router();
const { criarDesafio, listarDesafios } = require('../controllers/desafioController');

router.post('/', criarDesafio);
router.get('/', listarDesafios);

module.exports = router;

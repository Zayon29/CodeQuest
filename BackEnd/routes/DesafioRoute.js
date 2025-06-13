const express = require('express');
const router = express.Router();
const {criarDesafio,listarDesafios,desafioAtual,atualizarDesafio,deletarDesafio} = require('../controllers/desafioController');
const verificarAdmin = require('../middlewares/verificarAdmin'); // middleware que verifica se o usuário é admin

// Privado para o  admin poder fazer o crud
router.post('/', verificarAdmin, criarDesafio);
router.put('/:id', verificarAdmin, atualizarDesafio);
router.delete('/:id', verificarAdmin, deletarDesafio);

// público
router.get('/', listarDesafios);
router.get('/atual', desafioAtual); //era para tirar o desafio atual do dia(n sei se ta usando ainda)

module.exports = router;

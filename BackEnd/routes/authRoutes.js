const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

//classe responsavel para definir as rotas que lidam com o processo de autenticação dos usuários.

router.post('/register', register);
router.post('/login', login);

module.exports = router;

const express = require('express');
const router = express.Router();
const {criarUsuario,listarUsuarios,buscarUsuarioPorId,atualizarUsuario,deletarUsuario} = require('../controllers/userController');
const {perfil,getDesafiosResolvidos,salvarDesafioResolvido,obterPerfil} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const verificarAdmin = require('../middleware/verificarAdmin');

// ROTAS PRIVADAS PARA ADMIN (CRUD de usuários)
router.post('/', authMiddleware, verificarAdmin, criarUsuario);
router.get('/', authMiddleware, verificarAdmin, listarUsuarios);
router.get('/:id', authMiddleware, verificarAdmin,buscarUsuarioPorId);
router.put('/:id', authMiddleware, verificarAdmin, atualizarUsuario);
router.delete('/:id', authMiddleware, verificarAdmin, deletarUsuario);

// ROTAS PARA USUÁRIO AUTENTICADO
router.get('/perfil', authMiddleware, perfil);
router.get('/desafios-resolvidos/:id', authMiddleware, getDesafiosResolvidos);
router.post('/desafios-resolvidos/:id', authMiddleware, salvarDesafioResolvido);
router.get('/perfil', authMiddleware, obterPerfil);


module.exports = router;

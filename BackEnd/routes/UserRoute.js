const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const verificarAdmin = require('../middleware/verificarAdmin');

// ROTAS PRIVADAS PARA ADMIN (CRUD de usuários)
router.post('/', authMiddleware, verificarAdmin, userController.criarUsuario);
router.get('/', authMiddleware, verificarAdmin, userController.listarUsuarios);
router.get('/:id', authMiddleware, verificarAdmin, userController.buscarUsuarioPorId);
router.put('/:id', authMiddleware, verificarAdmin, userController.atualizarUsuario);
router.delete('/:id', authMiddleware, verificarAdmin, userController.deletarUsuario);

// ROTAS PARA USUÁRIO AUTENTICADO
router.get('/perfil', authMiddleware, userController.perfil);
router.get('/desafios-resolvidos/:id', authMiddleware, userController.getDesafiosResolvidos);
router.post('/desafios-resolvidos/:id', authMiddleware, userController.salvarDesafioResolvido);
router.get('/meuperfil/detalhado', authMiddleware, userController.obterPerfil);

module.exports = router;

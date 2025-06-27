const Usuario = require("../models/User");
const Desafio = require("../models/Desafio");
const bcrypt = require('bcryptjs');

// === PERFIL AUTENTICADO ===
const perfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuarioId).select('-senha');
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuário não encontrado.' });
    }
    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).json({ msg: 'Erro no servidor.' });
  }
};

// === GET DESAFIOS RESOLVIDOS ===
const getDesafiosResolvidos = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.json(usuario.desafiosResolvidos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar desafios resolvidos" });
  }
};

// === SALVAR DESAFIO RESOLVIDO ===
const salvarDesafioResolvido = async (req, res) => {
  try {
    const { id } = req.params;
    const { desafioId, linguagemUtilizada } = req.body;

    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const desafio = await Desafio.findById(desafioId);
    if (!desafio) {
      return res.status(404).json({ message: "Desafio não encontrado" });
    }

    const desafioResolvido = {
      desafioId: desafio._id,
      titulo: desafio.titulo,
      dificuldade: desafio.dificuldade,
      linguagemUtilizada,
    };

    usuario.desafiosResolvidos.push(desafioResolvido);
    await usuario.save();

    res.status(201).json({ message: "Desafio salvo com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao salvar desafio resolvido" });
  }
};

// === OBTER PERFIL (com populate) ===
const obterPerfil = async (req, res) => {
  try {
    const user = await Usuario.findById(req.user._id).populate('desafiosResolvidos', 'titulo dificuldade linguagemUtilizada');
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json({
      nome: user.nome,
      email: user.email,
      desafiosResolvidos: user.desafiosResolvidos
    });
  } catch (err) {
    console.error('Erro ao obter perfil:', err);
    res.status(500).json({ message: 'Erro ao obter perfil' });
  }
};

// =================== CRUD DE USUÁRIOS =================

// Criar usuário (admin pode usar para criar outros usuários)
const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, isAdmin } = req.body;

    // Verifica se o usuário já existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Usuário já existe com esse email' });
    }
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // usuario ja com senha criptografada
    const novoUsuario = new Usuario({
      nome,
      email,
      senha: senhaCriptografada,
      isAdmin: isAdmin || false // define admin se enviado
    });

    await novoUsuario.save();
    res.status(201).json({ message: 'Usuário criado com sucesso!' });

  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Erro no servidor ao criar usuário' });
  }
};

// Listar todos os usuários
const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-senha');
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar usuários.' });
  }
};

// Buscar usuário por ID
const buscarUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select('-senha');
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar usuário.' });
  }
};

// Atualizar usuário
const atualizarUsuario = async (req, res) => {
  try {
    const { nome, email, isAdmin } = req.body;
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      { nome, email, isAdmin },
      { new: true }
    ).select('-senha');

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.json({ message: 'Usuário atualizado.', usuario });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar usuário.' });
  }
};

// Deletar usuário
const deletarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.json({ message: 'Usuário deletado com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar usuário.' });
  }
};

module.exports = {
  perfil,
  getDesafiosResolvidos,
  salvarDesafioResolvido,
  obterPerfil,
  criarUsuario,
  listarUsuarios,
  buscarUsuarioPorId,
  atualizarUsuario,
  deletarUsuario
};

const Usuario = require("../models/User");
const Desafio = require("../models/Desafio");


const User = require('../models/User');

const perfil = async (req, res) => {
  try {
    
    const usuario = await User.findById(req.usuarioId).select('-senha'); // Remove senha do retorno
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuário não encontrado.' });
    }

    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).json({ msg: 'Erro no servidor.' });
  }
};

module.exports = { perfil };

exports.getDesafiosResolvidos = async (req, res) => {
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

exports.salvarDesafioResolvido = async (req, res) => {
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

exports.obterPerfil = async (req, res) => {
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
module.exports = userController;
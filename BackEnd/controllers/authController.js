const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ msg: 'Usuário já existe.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = new User({ nome, email, senha: senhaHash });
    await novoUsuario.save();

    res.status(201).json({ msg: 'Usuário criado com sucesso!' });
  } catch (err) {
    res.status(500).json({ msg: 'Erro no servidor.' });
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: 'Usuário não encontrado.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(400).json({ msg: 'Senha incorreta.' });
    }

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email
      }
    });
  } catch (err) {
    res.status(500).json({ msg: 'Erro no servidor.' });
  }
};

module.exports = { register, login };

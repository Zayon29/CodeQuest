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

    const novoUsuario = new User({
      nome,
      email,
      senha: senhaHash,
      isAdmin: email.endsWith('@codequest.com')
    });

    await novoUsuario.save();

    // 🔐 Gerar token JWT
    const token = jwt.sign({ id: novoUsuario._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // ✅ Retornar o token e os dados do usuário para salvar no localStorage
    res.status(201).json({
      msg: 'Usuário criadoso!',
      token,
      usuario: {
        id: novoUsuario._id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        isAdmin: novoUsuario.isAdmin,
      }
    });

  } catch (err) {
    console.error('Erro no cadastro do usuário: ', err);
    res.status(500).json({ msg: 'Erro no servidor.' });
  }
};


const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Usamos .populate() para já carregar os desafios junto
    const usuario = await User.findOne({ email }).populate('desafiosResolvidos');

    if (!usuario) {
      return res.status(400).json({ msg: 'Usuário não encontrado.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(400).json({ msg: 'Senha incorreta.' });
    }

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // >>>>> A CORREÇÃO ESTÁ AQUI <<<<<
    // Garantimos que a resposta JSON tem uma chave 'token' E uma chave 'usuario'
    res.status(200).json({
      token: token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        isAdmin: usuario.isAdmin,
        desafiosResolvidos: usuario.desafiosResolvidos 
      }
    });

  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ msg: 'Erro no servidor.' });
  }
};

module.exports = { register, login };

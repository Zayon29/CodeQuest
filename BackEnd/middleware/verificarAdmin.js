const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verificarAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token não fornecido.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await User.findById(decoded.id);

    if (!usuario || !usuario.isAdmin) {
      return res.status(403).json({ message: 'Acesso negado. Requer privilégios de administrador.' });
    }

    req.usuario = usuario;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido.' });
  }
};

module.exports = verificarAdmin;

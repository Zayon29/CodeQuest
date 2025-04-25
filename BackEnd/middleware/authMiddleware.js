const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // salva os dados do token no req.user
    next(); // libera a rota
  } catch (err) {
    return res.status(401).json({ msg: 'Token inválido ou expirado' });
  }
};

module.exports = authMiddleware;

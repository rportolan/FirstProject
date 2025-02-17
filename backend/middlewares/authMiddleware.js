const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({ error: 'Un token est requis pour accéder à cette ressource.' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'Un token est requis pour accéder à cette ressource.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id_user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalide.' });
  }
};

module.exports = verifyToken;





const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'sai-secret-key';

function signToken() {
  return jwt.sign({ admin: true }, SECRET, { expiresIn: '8h' });
}

function verifyToken(req) {
  const auth = req.headers.authorization || '';
  const token = auth.replace('Bearer ', '');
  if (!token) return false;
  try { jwt.verify(token, SECRET); return true; }
  catch { return false; }
}

module.exports = { signToken, verifyToken };

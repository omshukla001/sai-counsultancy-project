// POST /api/login
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  const { username, password } = req.body || {};
  if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
    const { signToken } = require('./_auth');
    return res.json({ ok: true, token: signToken() });
  }
  res.status(401).json({ ok: false, error: 'Invalid credentials' });
};

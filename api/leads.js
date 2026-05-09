// POST /api/leads  — public (form submission)
// GET  /api/leads  — protected (dashboard)
// DELETE /api/leads?id=xxx — protected
const { connectDB, Lead } = require('./_db');
const { verifyToken } = require('./_auth');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  await connectDB();

  if (req.method === 'POST') {
    try {
      const lead = await Lead.create(req.body);
      return res.json({ ok: true, id: lead._id });
    } catch (e) {
      return res.status(400).json({ ok: false, error: e.message });
    }
  }

  if (!verifyToken(req)) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'GET') {
    const leads = await Lead.find().sort({ submittedAt: -1 });
    return res.json(leads);
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    await Lead.findByIdAndDelete(id);
    return res.json({ ok: true });
  }

  res.status(405).end();
};

const mongoose = require('mongoose');

let cached = global._mongoConn;

async function connectDB() {
  if (cached) return cached;
  cached = global._mongoConn = await mongoose.connect(process.env.MONGO_URI);
  return cached;
}

const leadSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  email:   { type: String, required: true },
  phone:   { type: String, required: true },
  state:   String, exam: String, rank: String, branch: String, message: String,
  submittedAt: { type: Date, default: Date.now }
});

const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema);

module.exports = { connectDB, Lead };

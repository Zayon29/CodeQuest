const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  pontos: { type: Number, default: 0 },
  desafiosResolvidos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' }]
});

module.exports = mongoose.model('User', UserSchema);

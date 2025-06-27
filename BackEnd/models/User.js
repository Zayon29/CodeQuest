const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  pontos: { type: Number, default: 0 },
  desafiosResolvidos: [{
    desafioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Desafio' },
  titulo: String,
    dificuldade: String,
  linguagemUtilizada: String
}],
  
  // campo de admin
  isAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema);

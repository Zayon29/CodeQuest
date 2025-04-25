const mongoose = require('mongoose');

const desafioSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: { type: String, required: true },
  entradaExemplo: { type: String, required: true },
  saidaExemplo: { type: String, required: true },
  dificuldade: { type: String, enum: ['fácil', 'médio', 'difícil'], required: true },
  linguagensSuportadas: [{ type: String, required: true }],
});

const Desafio = mongoose.model('Desafio', desafioSchema);

module.exports = Desafio;

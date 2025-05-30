const Desafio = require('../models/Desafio');

// Função para criar um desafio
const criarDesafio = async (req, res) => {
  const { titulo, descricao, entradaExemplo, saidaExemplo, dificuldade, linguagensSuportadas } = req.body;
  try {
    const desafio = new Desafio({
      titulo,
      descricao,
      entradaExemplo,
      saidaExemplo,
      dificuldade,
      linguagensSuportadas
    });
    await desafio.save();
    res.status(201).json(desafio);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Função para listar todos os desafios
const listarDesafios = async (req, res) => {
  try {
    const desafios = await Desafio.find();
    res.status(200).json(desafios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//função apra retornar o desafio atual/diario a logica disso aqui pode mudar por enquanto esta como o ULTIMO CADASTRADO
const desafioAtual = async (req, res) => {
  try {
    const desafio = await Desafio.findOne().sort({ createdAt: -1 }); // ou por data: { data: -1 }
    if (!desafio) {
      return res.status(404).json({ message: 'Nenhum desafio encontrado.' });
    }
    res.status(200).json(desafio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { criarDesafio, listarDesafios, desafioAtual };

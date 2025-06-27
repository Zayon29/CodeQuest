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

const desafioAtual = async (req, res) => {
  try {
    const desafios = await Desafio.aggregate([{ $sample: { size: 1 } }]);

    if (!desafios || desafios.length === 0) {
      return res.status(404).json({ message: 'Nenhum desafio encontrado.' });
    }

    res.status(200).json(desafios[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const atualizarDesafio = async (req, res) => {
  const { id } = req.params;
  try {
    const desafioAtualizado = await Desafio.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    if (!desafioAtualizado) {
      return res.status(404).json({ message: 'Desafio não encontrado.' });
    }
    res.status(200).json(desafioAtualizado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deletarDesafio = async (req, res) => {
  const { id } = req.params;
  try {
    const desafio = await Desafio.findByIdAndDelete(id);
    if (!desafio) {
      return res.status(404).json({ message: 'Desafio não encontrado' });
    }
    res.status(200).json({ message: 'Desafio deletado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = { criarDesafio, listarDesafios, desafioAtual,  atualizarDesafio, deletarDesafio };

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
    // conta quantos desafios tem
    const count = await Desafio.countDocuments();
    if (count === 0) {
      return res.status(404).json({ message: "Nenhum desafio encontrado." });
    }

    // escolhe um índice aleatório
    const randomIndex = Math.floor(Math.random() * count);

    // busca um desafio pulando até o índice aleatório
    const desafio = await Desafio.findOne().skip(randomIndex);
    res.json(desafio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar o desafio aleatório." });
  }
};

module.exports = { criarDesafio, listarDesafios, desafioAtual };

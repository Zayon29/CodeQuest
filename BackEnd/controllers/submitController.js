const axios = require('axios');
const Desafio = require('../models/Desafio');

const JUDGE0_BASE_URL = 'https://judge0-ce.p.rapidapi.com/submissions';
const RAPIDAPI_KEY = '60c64910b7msh61bb2c1c5e3ec8ep176861jsn91baa08a6dee';

const headers = {
  'content-type': 'application/json',
  'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
  'X-RapidAPI-Key': RAPIDAPI_KEY,
  'Accept': 'application/json'
};

// status codes
const STATUS_MESSAGES = {
  1: 'Em fila de execução',
  2: 'Processando',
  3: 'Sucesso',
  4: 'Resposta incorreta',
  5: 'Tempo limite excedido',
  6: 'Erro de compilação',
  7: 'Erro durante execução',
  8: 'Memória insuficiente',
  9: 'Erro interno no servidor de avaliação'
};

const submeterCodigo = async (req, res) => {
  const { source_code, language_id, desafioId } = req.body;

  try {
    // Validação básica
    if (!source_code || !language_id || !desafioId) {
      return res.status(400).json({ 
        message: 'Dados incompletos',
        camposFaltantes: {
          source_code: !source_code,
          language_id: !language_id,
          desafioId: !desafioId
        }
      });
    }

    const desafio = await Desafio.findById(desafioId);
    if (!desafio) {
      return res.status(404).json({ 
        message: 'Desafio não encontrado',
        desafioId
      });
    }

    const submissionResponse = await axios.post(
      `${JUDGE0_BASE_URL}?base64_encoded=false&wait=true`,
      {
        source_code,
        language_id: Number(language_id),
        stdin: desafio.entradaExemplo,
        expected_output: desafio.saidaExemplo.replace(/\\n/g, '\n'),
      },
      { 
        headers,
        timeout: 10000 // 10 segundos de timeout
      }
    );

    const resultado = submissionResponse.data;
    const statusCode = resultado.status?.id;
    const statusMessage = STATUS_MESSAGES[statusCode] || resultado.status?.description;

    // Processamento dos resultados
    const responseData = {
      sucesso: statusCode === 3,
      status: statusMessage,
      tempoExecucao: resultado.time ? `${resultado.time}s` : null,
      memoria: resultado.memory ? `${resultado.memory}KB` : null,
      detalhes: {
        saidaObtida: resultado.stdout,
        saidaEsperada: desafio.saidaExemplo,
        linguagem: language_id
      }
    };

    // Adiciona informações específicas de erro quando relevante
    if (statusCode !== 3) {
      responseData.erro = {
        tipo: statusMessage,
        detalhes: resultado.compile_output || resultado.stderr || resultado.message,
        statusId: statusCode
      };
    }

    res.status(200).json(responseData);

  } catch (err) {
    console.error('Erro detalhado:', {
      message: err.message,
      stack: err.stack,
      responseData: err.response?.data
    });

    // Tratamento específico para timeout
    if (err.code === 'ECONNABORTED') {
      return res.status(504).json({
        message: 'Tempo de espera excedido',
        solucao: 'Tente novamente ou simplifique seu código'
      });
    }

    // Erros da API Judge0
    if (err.response) {
      return res.status(err.response.status).json({
        message: 'Erro no servidor de avaliação',
        error: err.response.data,
        statusCode: err.response.status
      });
    }

    // Erros genéricos
    res.status(500).json({ 
      message: 'Erro interno ao processar submissão',
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

module.exports = { submeterCodigo };
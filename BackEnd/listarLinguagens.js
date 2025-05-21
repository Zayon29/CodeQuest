const axios = require('axios');

const headers = {
  'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
  'X-RapidAPI-Key': '60c64910b7msh61bb2c1c5e3ec8ep176861jsn91baa08a6dee',
};

axios.get('https://judge0-ce.p.rapidapi.com/languages', { headers })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Erro ao buscar linguagens:', error.response?.data || error.message);
  });

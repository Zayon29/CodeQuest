const express = require('express');
const cors = require('cors');
const connectDB = require('./Database');


// Import de todas as rotas
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/UserRoute');
const desafioRoutes = require('./routes/DesafioRoute');
const submitRoutes = require('./routes/submitRoute');

console.log('Tipo de desafioRoutes:', typeof desafioRoutes);

require('dotenv').config();

const app = express();

console.log('🔌 Conectando ao MongoDB...');
connectDB();

app.use(cors());
app.use(express.json({ limit: '1mb' }));

console.log('🧭 Registrando rotas...');

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/desafios', desafioRoutes);
app.use('/api/submit', submitRoutes);

app.get('/', (req, res) => res.send('Servidor ativo'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`✅ Servidor rodando na porta ${PORT}`));
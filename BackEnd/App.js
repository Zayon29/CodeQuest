const express = require('express');
const cors = require('cors');
const connectDB = require('./Database');


// Importe todas as rotas da mesma forma
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/UserRoute');
const desafioRoutes = require('./routes/DesafioRoute');

console.log('Tipo de desafioRoutes:', typeof desafioRoutes);

require('dotenv').config();

const app = express();

console.log('🔌 Conectando ao MongoDB...');
connectDB();

app.use(cors());
app.use(express.json());

console.log('🧭 Registrando rotas...');


app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/desafios', desafioRoutes);

app.get('/', (req, res) => res.send('Servidor ativo'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`✅ Servidor rodando na porta ${PORT}`));
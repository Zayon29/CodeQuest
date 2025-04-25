const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Removendo as opções deprecated
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log('MongoDB conectado!');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

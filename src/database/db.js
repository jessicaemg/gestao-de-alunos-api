import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

mongoose.connection.on('error', (err) => {
  console.error('Erro de conexão com o MongoDB:', err.message);
});

mongoose.connection.once('open', () => {
  console.log('MongoDB conectado com sucesso!');
});

async function connect() {
  try {
    // Se houver uma URI no .env, tenta usar
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
    } else {
      // Caso contrário, sobe o banco em memória automaticamente
      const mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);
      console.log('Servidor MongoDB em memória iniciado com sucesso!');
    }
  } catch (err) {
    console.error('Falha ao conectar no MongoDB:', err.message);
  }
}

await connect();

export default mongoose;

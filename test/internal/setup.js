import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer;

before(async function () {
  this.timeout(30000);
  
  if (mongoose.connection.readyState === 0) {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  }
});

// Cadastra o usuário padrão antes de cada teste rodar
beforeEach(async function () {
  if (mongoose.connection.readyState !== 0) {
    // Se você tiver um model de Administrador/Usuario, pode popular a base zerada aqui:
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }

    // Exemplo: Criar o admin inicial para o teste de login passar
    if (mongoose.models.Administrador) {
      await mongoose.models.Administrador.create({
        nome: "Admin Teste",
        email: "admin@email.com",
        senha: "senha_criptografada_ou_plana_conforme_api" // ajuste conforme o schema do projeto
      });
    }
  }
});

after(async function () {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
});
import request from 'supertest';
import { expect } from 'chai';
import app from '../../src/app.js';

describe('Login', () => {
    it('CT1 - Deve retornar 200 quando o usuário e senha estão corretos', async () =>{
        const loginResposta = await request('app')
        .post('/api/auth/login')
        .set('Content-Type', 'application/json')
        .send({
            email: 'admin@escola.com', 
            senha: 'admin123'
        });
  
        expect(loginResposta.status).to.equal(200);
    });


    it('CT2 - Deve retornar 401 quando o usuário e senha estão incorretos', async () =>{
        const loginResposta = await request('app')
        .post('/api/auth/login')
        .set('Content-Type', 'application/json')
        .send({
            email: 'admin@escola.com', 
            senha: 'admin1234'
        });
  
        expect(loginResposta.status).to.equal(401);
        expect(loginResposta.body.error).to.equal('E-mail ou senha inválidos.')
    });


    it('CT3 - Deve retornar 400 quando o usuário e senha estão em branco', async () =>{
        const loginResposta = await request('app')
        .post('/api/auth/login')
        .set('Content-Type', 'application/json')
        .send({
            email: 'admin@escola.com', 
            senha: ''
        });
  
        expect(loginResposta.status).to.equal(400);
        expect(loginResposta.body.error).to.equal('Os campos "email" e "senha" são obrigatórios.')
    });

    

  
});
import request from 'supertest';
import { expect } from 'chai';
import { getToken } from '../helpers/auth.js'


describe('Login', () => {
    let token;
    
    beforeEach(async () => {
      token = await getToken('admin@escola.com', 'admin123');
    });

    it('CT1 - Deve cadastrar o aluno quando informa dados validos', async () => {
       const timestamp = Date.now();
       const emailEsperado = `davit${timestamp}@email.com`;

        const cadastrarAlunoResposta = await request('http://localhost:3000')
            .post('/api/admin/alunos')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token) 
            .send({
                nome: 'Davi Paz',
                email: emailEsperado,
                matricula: `${timestamp}`,
                senha: '1258895'
            });
        console.log(token)
        expect(cadastrarAlunoResposta.status).to.equal(201);
        expect(cadastrarAlunoResposta.body.nome).to.equal('Davi Paz');
        expect(cadastrarAlunoResposta.body.email).to.equal(emailEsperado);
    });

    it('CT2 - Não deve permitir um cadastro de aluno que já existe', async () => {
        const token = await getToken('admin@escola.com', 'admin123')
        console.log(token);

        const cadastrarAlunoResposta = await request('http://localhost:3000')
            .post('/api/admin/alunos')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token) // Dica: adicionei o espaço após 'Bearer '
            .send({

                nome: 'Carla Mendes', 
                email: 'carla.mendes@example.com', 
                matricula: '2024003',
                senha: '123456'
            });

        expect(cadastrarAlunoResposta.status).to.equal(409);
        expect(cadastrarAlunoResposta.body.error).to.equal('Já existe um aluno cadastrado com essa matrícula ou e-mail.');
        
    });

    it('CT3 - Deve fazer um get de busca pelo os alunos', async () => {

        const buscarAlunoResposta = await request('http://localhost:3000')
            .get('/api/admin/alunos')
            .set('Authorization', 'Bearer ' + token) 

        console.log(token)
        expect(buscarAlunoResposta.status).to.equal(200);
        expect(buscarAlunoResposta.body).to.be.an('array');
        
    });
});
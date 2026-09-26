import { api } from '../helpers/api.js'
import { expect } from 'chai';
import { TokenAdminEn } from '../helpers/auth.js';
import { novoAluno } from '../factories/alunosFactory.js';
import { novaDisciplinas } from '../factories/disciplinasFactory.js';
import matriculasTestes from '../fixtures/matriculas.json' with { type: 'json' };


describe('Disciplina do aluno retornando do factory', () => {

    it('CT1 - Dado que ao cadastrar um aluno novo na disciplina deve da sucesso', async () => {
        //cadastro do aluno

        const cadastrarAlunoResposta = await api()
            .post('/api/admin/alunos')
            .set('Content-Type', 'application/json')
            .set('Authorization', await TokenAdminEn())
            .send(novoAluno());


        const alunoId = cadastrarAlunoResposta.body.id || cadastrarAlunoResposta.body._id;;

        //cadastro da disciplina

        const cadastrarDisciplinaResposta = await api()
            .post('/api/admin/disciplinas')
            .set('Content-Type', 'application/json')
            .set('Authorization', await TokenAdminEn())
            .send(novaDisciplinas());

        const disciplinaId = cadastrarDisciplinaResposta.body.id || cadastrarDisciplinaResposta.body._id;
        // cadstrando o aluno na disciplina

        const cadastrarAlunoDisciplinaResposta = await api()
            .post(`/api/admin/disciplinas/${disciplinaId}/matriculas`)
            .set('Content-Type', 'application/json')
            .set('Authorization', await TokenAdminEn())
            .send({
                alunoId: alunoId,
            });


        expect(cadastrarAlunoDisciplinaResposta.status).to.equal(201);
        expect(cadastrarAlunoDisciplinaResposta.body.alunoId).to.equal(alunoId);
        expect(cadastrarAlunoDisciplinaResposta.body.disciplinaId).to.equal(disciplinaId);
    });

    matriculasTestes.forEach(matriculasTestes => {
        it(matriculasTestes.testTitle, async () => {
            const alunoData = novoAluno();
            const disciplinaData = novaDisciplinas();



            const cadastrarAlunoResposta = await api()
                .post('/api/admin/alunos')
                .set('Content-Type', 'application/json')
                .set('Authorization', await TokenAdminEn())
                .send(alunoData);

            console.log('STATUS:', cadastrarAlunoResposta.status);
            console.log('MENSAGEM DE ERRO DA API:', cadastrarAlunoResposta.body);
            const alunoId = cadastrarAlunoResposta.body.id || cadastrarAlunoResposta.body._id;

            //cadastro da disciplina

            const cadastrarDisciplinaResposta = await api()
                .post('/api/admin/disciplinas')
                .set('Content-Type', 'application/json')
                .set('Authorization', await TokenAdminEn())
                .send(disciplinaData);

            const disciplinaId = cadastrarDisciplinaResposta.body.id || cadastrarDisciplinaResposta.body._id;
            // cadstrando o aluno na disciplina

            const cadastrarAlunoDisciplinaResposta = await api()
                .post(`/api/admin/disciplinas/${disciplinaId}/matriculas`)
                .set('Content-Type', 'application/json')
                .set('Authorization', await TokenAdminEn())
                .send({
                    alunoId: alunoId,
                });

            console.log('STATUS:', cadastrarAlunoDisciplinaResposta.status);
            console.log('MENSAGEM DE ERRO DA API:', cadastrarAlunoDisciplinaResposta.body);
            expect(cadastrarAlunoDisciplinaResposta.status).to.equal(matriculasTestes.statusEsperado);
            expect(cadastrarAlunoDisciplinaResposta.body.alunoId).to.equal(alunoId);
            expect(cadastrarAlunoDisciplinaResposta.body.disciplinaId).to.equal(disciplinaId);
        });

    });
});
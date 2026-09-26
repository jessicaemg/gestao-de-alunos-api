import { api } from './api.js';
import 'dotenv/config';

let tokenCache = null;

export async function TokenAdminEn() {
    if (!tokenCache) {
        const loginResposta = await api()
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: process.env.ADMIN_EMAIL,
                senha: process.env.ADMIN_SENHA
            });
        tokenCache = loginResposta.body.token;
    }
    return `Bearer ${tokenCache}`;
}

export async function getToken(emailUser, passUser) {
    const loginResposta = await api()
        .post('/api/auth/login')
        .set('Content-Type', 'application/json')
        .send({
            email: emailUser,
            senha: passUser
        });

    return loginResposta.body.token;
}

//getToken('admin@escola.com', 'admin123')


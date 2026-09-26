import request from 'supertest';
import 'dotenv/config'
import app from '../src/app.js';

//const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

export function api () {
    return request(app);
}
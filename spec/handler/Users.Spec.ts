import supertest from 'supertest';
import { app } from '../../src/server';

let token: string = '';

describe('Users Endpoint Testing', () => {
    const request = supertest(app);

    it('POST /users/authenticate => should authenticate user and return token', async () => {
        // First, create a user directly in the database or via POST /users
        const newUser = {
            firstname: 'test',
            lastname: 'user',
            password: '1234',
        };

        // Create user (skip verifyAuthToken if needed for first user)
        await request.post('/users').send(newUser);

        const res = await request.post('/users/authenticate').send({
            firstname: 'test',
            password: '1234',
        });

        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
        token = res.body.token;
    });

    it('GET /users => should return list of users', async () => {
        const res = await request
            .get('/users')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /users/:id => should return one user', async () => {
        const res = await request
            .get('/users/1')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.firstname).toBeDefined();
    });

    it('POST /users => should create a new user', async () => {
        const res = await request
            .post('/users')
            .send({
                firstname: 'newuser',
                lastname: 'tester',
                password: '5678',
            })
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body).toBeDefined(); // returns JWT token
    });
});

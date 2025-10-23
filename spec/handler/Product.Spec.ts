import supertest from 'supertest';
import { app } from '../../src/server';

let token = '';

describe('Products Endpoint Testing', () => {
    const request = supertest(app);

    beforeAll(async () => {
        // Create a test user to get token
        const res = await request.post('/users').send({
            firstname: 'test',
            lastname: 'user',
            password: '1234',
        });
        token = res.body.token; // save token
    });

    it('POST /products => should create a product', async () => {
        const res = await request
            .post('/products')
            .send({
                name: 'Laptop',
                price: 1500,
                description: 'Gaming Laptop',
                category: 'Electronics',
            })
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200); // pass test if status is 200
        expect(res.body.name).toBe('Laptop');
    });

    it('GET /products => should return list of products', async () => {
        const res = await request
            .get('/products')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /products/:id => should return one product', async () => {
        const res = await request
            .get('/products/1')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.id).toBe(1);
    });

    it('PUT /products => should update product', async () => {
        const res = await request
            .put('/products')
            .send({
                id: 1,
                name: 'Laptop Updated',
                price: 1600,
                description: 'Updated description',
                category: 'Electronics',
            })
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Laptop Updated');
    });

    it('DELETE /products/:id => should delete product', async () => {
        const res = await request
            .delete('/products/1')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
    });
});

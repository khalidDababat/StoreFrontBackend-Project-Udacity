import supertest from 'supertest';
import { app } from '../../src/server';

const request = supertest(app);

describe('Order API Endpoints', () => {
    let token: string;
    let orderId: number;

    beforeAll(async () => {
        // 1. Create a user to get token
        const res = await request.post('/users').send({
            firstname: 'test',
            lastname: 'user',
            password: '12345',
        });
        token = res.body.token; // store JWT
    });

    it('should create an order (POST /orders)', async () => {
        const res = await request
            .post('/orders')
            .set('Authorization', `Bearer ${token}`)
            .send({
                user_id: 1,
                status: 'active',
            });

        expect(res.status).toBe(200);
        orderId = res.body.id; // save for next tests
    });

    it('should get orders (GET /orders)', async () => {
        const res = await request
            .get('/orders')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
    });

    it('should add product to order (POST /orders/:id/products)', async () => {
        const res = await request
            .post(`/orders/${orderId}/products`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                productId: 1,
                quantity: 2,
            });

        expect(res.status).toBe(200);
    });

    it('should get current order by user (GET /orders/:userId)', async () => {
        const res = await request
            .get('/orders/1')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
    });
});

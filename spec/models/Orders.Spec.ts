import { orderStore, Order } from '../../src/module/Orders';

const store = new orderStore();

describe('Order Model', () => {
    it('should have an index method', () => {
        //specify the test
        expect(store.index).toBeDefined(); // expectation
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have an addProduct method', () => {
        expect(store.addProduct).toBeDefined();
    });

    it('should have a currentOrderByUser method', () => {
        expect(store.currentOrderByUser).toBeDefined();
    });

    let createdOrder: Order;

    it('create method should add an order', async () => {
        const result = await store.create({
            user_id: 1,
            status: 'active',
        });

        createdOrder = result; // Save for next tests

        expect(result).toEqual({
            id: result.id,
            user_id: 1,
            status: 'active',
        });
    });

    it('index method should return a list of orders', async () => {
        const result = await store.index();
        expect(result[0]).toEqual({
            id: createdOrder.id,
            user_id: 1,
            status: 'active',
        });
    });

    it('addProduct method should add a product to order', async () => {
        const result = await store.addProduct(createdOrder.id as number, 1, 2);

        expect(result).toEqual({
            id: result.id,
            order_id: createdOrder.id,
            product_id: 1,
            quantity: 2,
        });
    });

    it('currentOrderByUser should return only active orders for a user', async () => {
        const result = await store.currentOrderByUser(1);

        expect(result[0]).toEqual({
            id: createdOrder.id,
            user_id: 1,
            status: 'active',
        });
    });
});

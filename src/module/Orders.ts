import client from '../database.js';

export type Order = {
    id?: number;
    user_id: number;
    status: string;
};

export type OrderProduct = {
    id?: number;
    quantity: number;
    order_id: number;
    product_id: number;
};

export class orderStore {
    async index(): Promise<Order[]> {
        try {
            // '@ts-expect-error'
            if (!client) throw new Error('Database client not initialized');
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders';
            const res = await conn.query(sql);
            conn.release();
            return res.rows;
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`);
        }
    }

    async create(o: Order): Promise<Order> {
        try {
            // '@ts-expect-error'
            if (!client) throw new Error('Database client not initialized');

            const conn = await client.connect();
            const sql =
                'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
            const res = await conn.query(sql, [o.user_id, o.status]);
            const order = res.rows[0];
            conn.release();
            return order;
        } catch (err) {
            console.log(err);
            throw new Error(`Could not add new order. Error: ${err}`);
        }
    }

    async addProduct(
        order_id: number,
        product_id: number,
        quantity: number
    ): Promise<OrderProduct> {
        try {
            // '@ts-expect-error'
            if (!client) throw new Error('Database client not initialized');

            const conn = await client.connect();
            const sql =
                'INSERT INTO order_products (order_id, product_id,quantity) VALUES($1, $2, $3) RETURNING *';
            const res = await conn.query(sql, [order_id, product_id, quantity]);
            const orderProduct = res.rows[0];
            conn.release();
            return orderProduct;
        } catch (err) {
            throw new Error(
                `Could not add product ${product_id} to order ${order_id}: ${err}`
            );
        }
    }

    async currentOrderByUser(userId: number): Promise<Order[]> {
        try {
            // '@ts-expect-error'
            if (!client) throw new Error('Database client not initialized');

            const conn = await client.connect();
            const sql =
                'SELECT * FROM orders WHERE user_id = ($1) AND status = $2';
            const result = await conn.query(sql, [userId, 'active']);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(
                `Could not find orders for user ${userId}. Error: ${err}`
            );
        }
    }
}

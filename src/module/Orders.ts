import client from '../database.js';

export type Order = {
    id?: string;
    user_id: string;
    status: string;
};

export class orderStore {
    async index(): Promise<Order[]> {
        try {
            // '@ts-expect-error'
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
            const conn = await client.connect();
            const sql =
                'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
            const  res = await conn.query(sql, [o.user_id, o.status]);
            const order = res.rows[0];
            conn.release();
            return order;
        } catch (err) {
            throw new Error(`Could not add new order. Error: ${err}`);
        }   
    }

    
}

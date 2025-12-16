import client from '../database.js';

export type Order = {
    id?: number;
    user_id: number;
    customer_name: string;
    customer_phone: string;
    customer_address: string;
    customer_area: string;
    note?: string;
    status: string;
    total_price: number;
};

export class orderStore {
    async create(o: Order): Promise<Order> {
        try {
            if (!client) throw new Error('Database client not initialized');
            // '@ts-expect-error
            const conn = await client.connect();
            const sql = ` 
            INSERT INTO orders
            (user_id, status,  total_price , customer_name, customer_phone,customer_address, customer_area, note)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `;
            const res = await conn.query(sql, [
                o.user_id,
                o.status,
                o.total_price,
                o.customer_name,
                o.customer_phone,
                o.customer_address,
                o.customer_area,
                o.note,
            ]);
            conn.release();
            return res.rows[0];
        } catch (err) {
            throw new Error(`Could not create order: ${err}`);
        }
    }

    async index(): Promise<Order[]> {
        if (!client) throw new Error('Database client not initialized');
        // '@ts-expect-error
        const conn = await client.connect();
        const sql = 'SELECT * FROM orders order by created_at DESC';
        const res = await conn.query(sql);
        conn.release();
        return res.rows;
    }

    async show(id: number): Promise<Order> {
        if (!client) throw new Error('Database client not initialized');
        // '@ts-expect-error
        const conn = await client.connect();
        const sql = 'SELECT * FROM orders WHERE id=$1';
        const res = await conn.query(sql, [id]);
        conn.release();
        return res.rows[0];
    }

    async updateStatus(id: number, status: string): Promise<Order> {
        if (!client) throw new Error('Database client not initialized');
        // '@ts-expect-error
        const conn = await client.connect();
        const sql = `
            UPDATE orders
            SET status=$1
            WHERE id=$2
            RETURNING *
        `;
        const res = await conn.query(sql, [status, id]);
        conn.release();
        return res.rows[0];
    }

    async delete(id: number): Promise<Order> {
        try {
            if (!client) throw new Error('Database client not initialized');
            // '@ts-expect-error
            const conn = await client.connect();
            const sql = `
                 DELETE FROM orders
                 WHERE id = $1
                 RETURNING *
            `;
            const res = await conn.query(sql, [id]);
            conn.release();
            return res.rows[0];
        } catch (error) {
            console.log(error);
            throw new Error(`Could not delete order ${id}. Error: ${error}`);
        }
    }

    async updateTotalPrice(id: number): Promise<Order> {
        try {
            if (!client) throw new Error('Database client not initialized');
            // '@ts-expect-error
            const conn = await client.connect();
            const sql = `
                UPDATE orders
                SET total_price = (
                    SELECT (p.price * po.quantity)
                    FROM products_orders po
                    JOIN products p ON p.id = po.product_id
                    WHERE po.order_id = $1
                )
                WHERE id = $1
                RETURNING *
            `;
            const res = await conn.query(sql, [id]);
            conn.release();
            return res.rows[0];
        } catch (error) {
            console.log('ssss', error);
            throw new Error(
                `Could not update total price for order ${id}. Error: ${error}`
            );
        }
    }
}

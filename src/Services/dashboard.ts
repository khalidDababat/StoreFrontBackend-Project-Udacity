import client from '../database';

import { Product } from '../module/Products';
export type OrderProduct = {
    product_id: number;
    name: string;
    price: number;
    quantity: number;
};

export type OrderDetails = {
    order_id: number;
    customer_name: string;
    customer_phone: string;
    customer_address: string;
    customer_area: string;
    note: string | null;
    status: string;
    total_price: number;
    created_at: Date;
    products: OrderProduct[];
};

export type DashboardStats = {
    products_count: number;
    orders_count: number;
    features_count: number;
};
export class DashboardQueries {
    // get Products Data by Specific ID
    async getAllProductsById(id: number): Promise<Product | null> {
        try {
            if (!client) {
                throw new Error('Database client not initialized');
            }

            // '@ts-expect-error
            const conn = await client.connect();
            const sql = 'select * from products where id =($1)';
            const res = await conn.query(sql, [id]);
            const product = res.rows[0];
            conn.release();
            return product;
        } catch (err) {
            throw new Error(`Could not get product ${id}. Error: ${err}`);
        }
    }

    // get All Order  Info and Customer Buy Products by spastic OrderID
    async getOrderDetails(orderID: number): Promise<OrderDetails | null> {
        try {
            if (!client) {
                throw new Error('Database client not initialized');
            }

            // '@ts-expect-error
            const conn = await client.connect();
            const sql = `
                   SELECT
                o.id AS order_id,
                o.customer_name,
                o.customer_phone,
                o.customer_address,
                o.customer_area,
                o.note,
                o.status,
                o.total_price,
                o.created_at,
                p.id AS product_id,
                p.name,
                p.price,
                po.quantity
            FROM orders o
            JOIN products_orders po ON po.order_id = o.id
            JOIN products p ON p.id = po.product_id
            WHERE o.id = $1
                 `;
            const res = await conn.query(sql, [orderID]);

            conn.release();

            if (res.rows.length === 0) return null;

            const order: OrderDetails = {
                order_id: res.rows[0].order_id,
                customer_name: res.rows[0].customer_name,
                customer_phone: res.rows[0].customer_phone,
                customer_address: res.rows[0].customer_address,
                customer_area: res.rows[0].customer_area,
                note: res.rows[0].note,
                status: res.rows[0].status,
                total_price: res.rows[0].total_price,
                created_at: res.rows[0].created_at,
                products: [],
            };

            for (const row of res.rows) {
                order.products.push({
                    product_id: row.product_id,
                    name: row.name,
                    price: row.price,
                    quantity: row.quantity,
                });
            }

            return order;
        } catch (error) {
            throw new Error(
                `Could not order details for orderID ${orderID} give Error ${error}`
            );
        }
    }

    // get number products , Orders, features
    async getStats(): Promise<DashboardStats> {
        try {
            if (!client) {
                throw new Error('Database client not initialized');
            }

            // '@ts-expect-error
            const conn = await client.connect();
            const sql = `
             SELECT
                (SELECT COUNT(*) FROM products) AS products_count,
                (SELECT COUNT(*) FROM orders) AS orders_count,
                (SELECT COUNT(*) FROM features) AS features_count
            `;
            const res = await conn.query(sql);
            conn.release();
            return res.rows[0];
        } catch (error) {
            throw new Error(`could not fetch state Error ${error}`);
        }
    }
}

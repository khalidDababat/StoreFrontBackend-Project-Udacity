import client from '../database';

export type ProductOrder = {
    id?: number;
    product_id: number;
    order_id: number;
    quantity: number;
};

export class productOrderStore {
    // assign product to order
    async create(po: ProductOrder): Promise<ProductOrder> {
        try {
            if (!client) throw new Error('Database client not initialized');
            // '@ts-expect-error
            const conn = await client.connect();
            const sql = `
            INSERT INTO products_orders
            (product_id, order_id, quantity)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
            const res = await conn.query(sql, [
                po.product_id,
                po.order_id,
                po.quantity,
            ]);
            conn.release();
            return res.rows[0];
        } catch (err) {
            throw new Error(
                `Could not add product ${po.product_id} to order ${po.order_id}. Error: ${err}`
            );
        }
    }

    async deleteProductByOrderId(orderId: number): Promise<void> {
        try {
            if (!client) throw new Error('Database client not initialized');
            // '@ts-expect-error
            const conn = await client.connect();
            const sql = `
                 DELETE FROM products_orders
                 WHERE order_id = $1
            `;
            const res = await conn.query(sql, [orderId]);
            conn.release();
            return res.rows[0];
        } catch (error) {
            throw new Error(
                `Could not delete products for order ${orderId}. Error: ${error}`
            );
        }
    }

    async updateQuantity(
        prodId: number,
        orderID: number,
        quantity: number
    ): Promise<{ quantity: number }> {
        try {
            if (!client) throw new Error('Database client not initialized');
            // '@ts-expect-error
            const conn = await client.connect();
            const sql = `
                        UPDATE products_orders
                        SET quantity = $1
                        WHERE product_id = $2 AND order_id = $3
                        RETURNING *  
                `;
            const res = await conn.query(sql, [quantity, prodId, orderID]);
            conn.release();
            return res.rows[0];
        } catch (error) {
            console.log(error);
            throw new Error(
                `Could not update quantity for product ${prodId}. Error: ${error}`
            );
        }
    }

    // get all info products for a specific order id
    // async getOrderProducts(orderId: number) {
    //     try {
    //         if (!client) throw new Error('Database client not initialized');
    //         // '@ts-expect-error
    //         const conn = await client.connect();
    //         const sql = `
    //         SELECT p.name, p.price, po.quantity
    //         FROM products_orders po
    //         JOIN products p ON p.id = po.id_product
    //         WHERE po.id_order = $1
    //     `;
    //         const res = await conn.query(sql, [orderId]);
    //         conn.release();
    //         return res.rows;
    //     } catch (error) {
    //         throw new Error(
    //             `Could not get products for order ${orderId}. Error: ${error}`
    //         );
    //     }
    // }
}

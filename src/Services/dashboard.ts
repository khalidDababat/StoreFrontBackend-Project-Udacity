import client from '../database';

import { Product } from '../module/Products';

export class DashboardQueries {
    //   // get Products Data by Specific ID
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
}

import client from '../database.js';

export type Product = {
    id?: string;
    name: string;
    price: number;
    description?: string;
    category: string;
};

export class productStore {
    async index(): Promise<Product[]> {
        if (!client) throw new Error('Database client not initialized');
        const conn = await client.connect();
        const sql = 'SELECT * FROM products';

        const res = await conn.query(sql);

        conn.release();
        return res.rows;
    }

    async show(id: number): Promise<Product | null> {
        try {
            if (!client) throw new Error('Database client not initialized');
            const conn = await client.connect();

            const sql = 'SELECT * FROM products WHERE id=($1)';
            const res = await conn.query(sql, [id]);
            conn.release();
            return res.rows[0];
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
    }

    async create(p: Product): Promise<Product> {
        if (!client) throw new Error('Database client not initialized');
        const conn = await client.connect();
        const sql =
            'INSERT INTO products (name, price, description,category) VALUES($1, $2, $3,$4) RETURNING *';

        const res = await conn.query(sql, [
            p.name,
            p.price,
            p.description,
            p.category,
        ]);
        const Product = res.rows[0];
        conn.release();
        return Product;
    }

    async delete(id: number): Promise<Product> {
        try {
            if (!client) throw new Error('Database client not initialized');
            const conn = await client.connect();
            const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
            const res = await conn.query(sql, [id]);
            const Product = res.rows[0];
            conn.release();
            return Product;
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
    }

    async update(p: Product): Promise<Product> {
        try {
            if (!client) throw new Error('Database client not initialized');
            const conn = await client.connect();
            const sql =
                'UPDATE products SET name=$1, price=$2, description=$3, category=$4 WHERE id=$5 RETURNING *';
            const res = await conn.query(sql, [
                p.name,
                p.price,
                p.description,
                p.category,
                p.id,
            ]);
            const Product = res.rows[0];
            conn.release();
            return Product;
        } catch (err) {
            throw new Error(`Could not update product ${p.id}. Error: ${err}`);
        }
    }
}

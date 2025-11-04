import client from '../database.js';

export type Product = {
    id?: string;
    name: string;
    price: number;
    description?: string;
    category: string;
    image?: string;
    features?: string[];
};

export class productStore {
    async index(): Promise<Product[]> {
        if (!client) throw new Error('Database client not initialized');

        //@'ts-expect-error
        const conn = await client.connect();
        const sql = 'SELECT * FROM products';

        const res = await conn.query(sql);

        conn.release();
        return res.rows;
    }

    async show(id: number): Promise<Product | null> {
        try {
            if (!client) throw new Error('Database client not initialized');
            //@'ts-expect-error
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
        try {
            if (!client) throw new Error('Database client not initialized');
            //@'ts-expect-error
            const conn = await client.connect();
            const sql =
                'INSERT INTO products (name, price, description,category, image,features) VALUES($1, $2, $3,$4,$5,$6) RETURNING *';

            const res = await conn.query(sql, [
                p.name,
                p.price,
                p.description,
                p.category,
                p.image,
                p.features ? JSON.stringify(p.features) : null,
            ]);
            const Product = res.rows[0];
            conn.release();
            return Product;
        } catch (err) {
            throw new Error(`Could not create product. Error: ${err}`);
        }
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
            //@'ts-expect-error
            const conn = await client.connect();
            const sql =
                'UPDATE products SET name=$1, price=$2, description=$3, category=$4,image=$5,features=$6  WHERE id=$7 RETURNING *';
            const res = await conn.query(sql, [
                p.name,
                p.price,
                p.description,
                p.category,
                p.image,
                p.features ? JSON.stringify(p.features) : null,
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

import client from '../database.js';

export type Product = {
    id?: string;
    name: string;
    price: number;
    description?: string;
    category_id: number;
    image?: string;
    stock?: number;
    is_active?: boolean;
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
            const sql = `
            INSERT INTO products 
            (name, price,image, description, stock ,is_active ,category_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `;

            const res = await conn.query(sql, [
                p.name,
                p.price,
                p.image ?? null,
                p.description ?? null,
                p.stock ?? 0,
                p.is_active ?? true,
                p.category_id,
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
            const sql = `
            UPDATE products
            SET
                name = $1,
                price = $2,
                description = $3,
                category_id = $4,
                image = $5,
                stock = $6,
                is_active = $7
            WHERE id = $8
            RETURNING *
        `;
            const res = await conn.query(sql, [
                p.name,
                p.price,
                p.description,
                p.category_id,
                p.image ?? null,
                p.stock ?? 0,
                p.is_active ?? true,
                p.id,
            ]);
            const Product = res.rows[0];
            conn.release();
            return Product;
        } catch (err) {
            throw new Error(`Could not update product ${p.id}. Error: ${err}`);
        }
    }

    async updateStockProduct(
        idProduct: number,
        stock: number
    ): Promise<Product> {
        try {
            if (!client) {
                throw new Error('Database client not initialized');
            }
            //@'ts-expect-error
            const conn = await client.connect();
            const sql = `
            UPDATE products
            SET stock = $1
            WHERE id = $2
            RETURNING *; 
             `;
            const res = await conn.query(sql, [stock, idProduct]);
            conn.release();
            return res.rows[0];
        } catch (error) {
            throw new Error(
                `Could not update Stock for id ${idProduct} Error ${error}`
            );
        }
    }

    // get All products Belong To Category Name Spastic
    async getProductsByCategoryName(categoryname: string): Promise<Product[]> {
        try {
            if (!client) {
                throw new Error('Database client not initialized');
            }
            //@'ts-expect-error
            const conn = await client.connect();
            const sql = `
                 SELECT p.*
                 FROM products p
                 JOIN categories c ON c.id = p.category_id
                 WHERE c.category = $1
             `;
            const res = await conn.query(sql, [categoryname]);
            conn.release();
            return res.rows[0];
        } catch (error) {
            throw new Error(
                `could not find any Products for category Name ${categoryname} Error ${error}`
            );
        }
    }
}

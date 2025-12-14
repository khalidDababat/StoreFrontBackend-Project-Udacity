import client from '../database';

export type Category = {
    id?: number;
    category: string;
};

export class categoryStore {
    async index(): Promise<Category[]> {
        if (!client) throw new Error('Database client not initialized');
        //'@ts-expect-error

        const conn = await client.connect();
        const sql = 'SELECT * FROM categories';
        const res = await conn.query(sql);
        conn.release();
        return res.rows;
    }

    async show(id: number): Promise<Category | null> {
        try {
            if (!client) throw new Error('Database client not initialized');
            //'@ts-expect-error
            const conn = await client.connect();
            const sql = 'SELECT * FROM categories WHERE id=($1)';
            const res = await conn.query(sql, [id]);
            conn.release();
            return res.rows[0];
        } catch (err) {
            throw new Error(`Could not find category ${id}. Error: ${err}`);
        }
    }

    async create(c: Category): Promise<Category> {
        try {
            if (!client) throw new Error('Database client not initialized');
            //'@ts-expect-error
            const conn = await client.connect();
            const sql = `
            INSERT INTO categories 
            (category)
            VALUES ($1)
            RETURNING *
        `;
            const res = await conn.query(sql, [c.category]);
            const Category = res.rows[0];
            conn.release();
            return Category;
        } catch (err) {
            throw new Error(
                `Could not create category ${c.category}. Error: ${err}`
            );
        }
    }

    async delete(id: number): Promise<Category> {
        try {
            if (!client) throw new Error('Database client not initialized');
            //'@ts-expect-error
            const conn = await client.connect();
            const sql = 'DELETE FROM categories WHERE id=($1) RETURNING *';
            const res = await conn.query(sql, [id]);
            const Category = res.rows[0];
            conn.release();
            return Category;
        } catch (err) {
            throw new Error(`Could not delete category ${id}. Error: ${err}`);
        }
    }

    async update(c: Category): Promise<Category> {
        try {
            if (!client) throw new Error('Database client not initialized');
            //'@ts-expect-error
            const conn = await client.connect();
            const sql = `
            UPDATE categories
            SET category=$1
            WHERE id=$2
            RETURNING *
        `;
            const res = await conn.query(sql, [c.category, c.id]);
            const Category = res.rows[0];
            conn.release();
            return Category;
        } catch (err) {
            throw new Error(`Could not update category ${c.id}. Error: ${err}`);
        }
    }
}

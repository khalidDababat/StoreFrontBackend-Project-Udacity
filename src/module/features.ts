import client from '../database';

export type feature = {
    id?: number;
    name: string;
};

export class featureStore {
    async index(): Promise<feature[]> {
        if (!client) throw new Error('Database client not initialized');
        // '@ts-expect-error
        const conn = await client.connect();
        const sql = 'SELECT * FROM  features';
        const res = await conn.query(sql);
        conn.release();
        return res.rows;
    }

    async show(id: number): Promise<feature> {
        if (!client) throw new Error('Database client not initialized');
        // '@ts-expect-error
        const conn = await client.connect();
        const sql = 'SELECT * FROM features WHERE id=$1';
        const res = await conn.query(sql, [id]);
        conn.release();
        return res.rows[0];
    }

    async create(f: feature): Promise<feature> {
        if (!client) throw new Error('Database client not initialized');
        // '@ts-expect-error
        const conn = await client.connect();
        const sql = ` 
            INSERT INTO features (name)
            VALUES ($1)
            RETURNING *
        `;
        const res = await conn.query(sql, [f.name]);
        conn.release();
        return res.rows[0];
    }

    async delete(id: number): Promise<feature> {
        if (!client) throw new Error('Database client not initialized');
        // '@ts-expect-error
        const conn = await client.connect();
        const sql = 'DELETE FROM features WHERE id=$1 RETURNING *';
        const res = await conn.query(sql, [id]);
        conn.release();
        return res.rows[0];
    }

    async update(f: feature): Promise<feature> {
        if (!client) throw new Error('Database client not initialized');
        // '@ts-expect-error
        const conn = await client.connect();
        const sql = `
            UPDATE features
            SET name=$1
            WHERE id=$2
            RETURNING *
        `;
        const res = await conn.query(sql, [f.name, f.id]);
        console.log('sss', res.rows[0]);
        conn.release();
        return res.rows[0];
    }
}

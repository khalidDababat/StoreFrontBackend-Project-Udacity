import client from '../database';

export type payments = {
    id?: number;
    orderId: number;
    amount: number;
    method: string; // cash | card | online
    status: string; // pending | paid | failed
    createdAt?: Date;
};

export class paymentsStore {
    async create(pym: payments): Promise<payments> {
        try {
            if (!client) {
                throw new Error('Database client is not available');
            }
            //'@ts-except-error
            const conn = await client.connect();
            const sql = `
            INSERT INTO payments (orderId, amount, method, status)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
         `;
            const res = await conn.query(sql, [
                pym.orderId,
                pym.amount,
                pym.method,
                pym.status,
            ]);
            conn.release();
            return res.rows[0];
        } catch (error) {
            throw new Error(`Could not create payment: ${error}`);
        }
    }
}

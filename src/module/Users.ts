import client from '../database.js';
import bcrypt from 'bcrypt';

import dotenv from 'dotenv';
dotenv.config();

const saltRounds = process.env['SALT_ROUNDS'];
const pepper = process.env['BCRYPT_PASSWORD'];

export type User = {
    id?: number;
    firstname: string;
    lastname?: string;
    password: string;
};

export class userStore {
    async index(): Promise<User[]> {
        try {
            //'@ts-expect-error'
            if (!client) throw new Error('Database client not initialized');

            const conn = await client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);

            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }

    async show(id: number): Promise<User | null> {
        try {
            //'@ts-expect-error'
            if (!client) throw new Error('Database client not initialized');

            const conn = await client.connect();
            const sql = 'SELECT * FROM users where id=($1)';
            const result = await conn.query(sql, [id]);

            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }

    async create(u: User): Promise<User> {
        try {
            // '@ts-expect-error'
            if (!client) throw new Error('Database client not initialized');

            const conn = await client.connect();
            const sql =
                'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *';

            const hash = bcrypt.hashSync(
                u.password + pepper,
                parseInt(saltRounds as string)
            );

            // console.log("hhhhhh " , hash);

            const result = await conn.query(sql, [
                u.firstname,
                u.lastname,
                hash,
            ]);
            const User = result.rows[0];
            conn.release();
            return User;
        } catch (err) {
            throw new Error(
                `Could not create user ${u.firstname}. Error: ${err}`
            );
        }
    }

    async authenticate(
        firstname: string,
        password: string
    ): Promise<User | null> {
        try {
            // '@ts-expect-error'
            if (!client) throw new Error('Database client not initialized');

            const conn = await client.connect();
            const sql = 'SELECT password FROM users WHERE firstName=($1)';
            const result = await conn.query(sql, [firstname]);
            if (result.rows.length) {
                const user = result.rows[0];

                // console.log("password + pepper ",password + pepper);

                if (bcrypt.compareSync(password + pepper, user.password)) {
                    return user;
                }
            }
            return null;
        } catch (err) {
            throw new Error(
                `Could not authenticate user ${firstname}. Error: ${err}`
            );
        }
    }
}

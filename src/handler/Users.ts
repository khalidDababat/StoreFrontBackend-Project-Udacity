import express, { Request, Response } from 'express';

import { User, userStore } from '../module/Users.js';
import jwt from 'jsonwebtoken';
import { verifyAuthToken } from './verifyAuthToken.js';

import dotenv from 'dotenv';
dotenv.config();

const store = new userStore();

//CRUD Operations
const index = async (_req: Request, res: Response) => {
    try {
        const Users = await store.index();
        res.json(Users);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const show = async (_req: Request, res: Response) => {
    const id = parseInt(_req.params['id'] ?? '');
    if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid user id' });
        return;
    }

    const User = await store.show(id);
    res.json(User); // Send To Client Front End
};

const create = async (req: Request, res: Response) => {
    try {
        const User: Omit<User, 'id'> = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
        };

        const newUser = await store.create(User);
        const tokenSecret = process.env['TOKEN_SECRET'];
        if (!tokenSecret) {
            throw new Error('TOKEN_SECRET environment variable is not set');
        }
        const token = jwt.sign({ user: newUser }, tokenSecret);

        res.json(token);
    } catch (err) {
        console.error(' Error creating user:', err);
        res.status(400);
        res.json(err);
    }
};

const authenticate = async (req: Request, res: Response) => {
    const user: User = {
        firstname: req.body.firstname,
        password: req.body.password,
    };

    try {
        const authenticatedUser = await store.authenticate(
            user.firstname,
            user.password
        );
        const tokenSecret = process.env['TOKEN_SECRET'];
        if (!tokenSecret) {
            throw new Error('TOKEN_SECRET environment variable is not set');
        }
        const token = jwt.sign({ user: authenticatedUser }, tokenSecret, {
            expiresIn: '1h',
        });
        res.json({ ...authenticatedUser, token });
    } catch (err) {
        res.status(401);
        res.json({ error: 'Authentication failed' });
        console.error('Authentication error:', err);
    }
};

const usersRoutes = (app: express.Application) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', verifyAuthToken, create);
    app.post('/users/authenticate', authenticate);
};

export default usersRoutes;

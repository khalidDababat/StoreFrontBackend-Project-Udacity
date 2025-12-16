import express, { Request, Response } from 'express';
import { verifyAuthToken } from './verifyAuthToken';
//import { verifyAuthToken } from './verifyAuthToken.js';

import { Category, categoryStore } from '../module/categories';

const store = new categoryStore();

//CRUD Operations

const index = async (_req: Request, res: Response) => {
    const Categories = await store.index();
    res.json(Categories);
};

const show = async (_req: Request, res: Response) => {
    const id = parseInt(_req.params['id'] ?? '');
    if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid category id' });
        return;
    }

    const Category = await store.show(id);
    res.json(Category); // Send To Client Front End
};

const create = async (req: Request, res: Response) => {
    try {
        const Category: Omit<Category, 'id'> = {
            category: req.body.category,
        };

        const newCategory = await store.create(Category);
        res.json(newCategory);
    } catch (err) {
        res.status(400).json(err);
    }
};

const deleteCategory = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params['id'] ?? '');
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid category id' });
            return;
        }
        const deletedCategory = await store.delete(id);
        res.json(deletedCategory);
    } catch (err) {
        res.status(400).json(err);
    }
};

// rest API routes
const categoryRoutes = (app: express.Application) => {
    app.get('/categories', index);
    app.get('/categories/:id', show);
    app.post('/categories', verifyAuthToken, create);
    app.delete('/categories/:id', verifyAuthToken, deleteCategory);
};

export default categoryRoutes;

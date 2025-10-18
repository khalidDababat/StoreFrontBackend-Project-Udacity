import express, { Request, Response } from 'express';
import { Product, productStore } from '../module/Products.js';

const store = new productStore();

//CRUD Operations

const index = async (_req: Request, res: Response) => {
    const Products = await store.index();
    res.json(Products);
};

const show = async (_req: Request, res: Response) => {
    const id = parseInt(_req.params['id'] ?? '');
    if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid product id' });
        return;
    }
    const Product = await store.show(id);
    res.json(Product); // Send To Client Front End
};

const create = async (req: Request, res: Response) => {
    try {
        const Product: Omit<Product, 'id'> = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
        };

        const newProduct = await store.create(Product);
        res.json(newProduct);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

// routes
const ProductsRoutes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', create);
};

export default ProductsRoutes;

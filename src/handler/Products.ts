import express, { Request, Response } from 'express';
import { Product, productStore } from '../module/Products.js';
import { verifyAuthToken } from './verifyAuthToken .js';

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

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params['id'] ?? '');
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid product id' });
            return;
        }
        const deletedProduct = await store.delete(id);
        res.json(deletedProduct);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const Product: Product = {
            id: req.body.id,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
        };

        const updatedProduct = await store.update(Product);
        res.json(updatedProduct);
    } catch (err) {
        res.status(400);
        res.json(err);
        console.error(' Error updating product:', err);
    }
};

// routes
const ProductsRoutes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken, create);
    app.delete('/products/:id', deleteProduct);
    app.put('/products', update);
};

export default ProductsRoutes;

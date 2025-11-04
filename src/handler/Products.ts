import express, { Request, Response } from 'express';
import { Product, productStore } from '../module/Products.js';
import { verifyAuthToken } from './verifyAuthToken.js';
import multer from 'multer';

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
            image: req.file ? `/uploads/${req.file.filename}` : '',
            features: req.body.features,
        };

        const newProduct = await store.create(Product);
        res.json(newProduct);
    } catch (err) {
        res.status(400).json(err);
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
        const id = req.params['id'] ?? '';
        if (isNaN(parseInt(id))) {
            res.status(400).json({ error: 'Invalid product id' });
            return;
        }

        const product: Product = {
            id,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            image: req.file ? `/uploads/${req.file.filename}` : '',
            features: req.body.features ? JSON.parse(req.body.features) : [],
        };

        const updatedProduct = await store.update(product);
        res.json({
            message: 'Product updated successfully',
            dataUpdate: updatedProduct,
        });
    } catch (err) {
        res.status(400);
        res.json(err);
        console.error(' Error updating product:', err);
    }
};

// routes  REST API
const ProductsRoutes = (app: express.Application) => {
    const UpLoad = multer({ dest: 'uploads/' });

    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken, UpLoad.single('image'), create);
    app.delete('/products/:id', deleteProduct);
    app.put('/products/:id', UpLoad.single('image'), update);
};

export default ProductsRoutes;

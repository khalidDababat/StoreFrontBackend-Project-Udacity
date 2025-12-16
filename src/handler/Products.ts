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
            category_id: req.body.category_id,
            image: req.file ? `/uploads/${req.file.filename}` : '',
            stock: req.body.stock,
            is_active: req.body.is_active,
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
        res.status(400).json(err);
    }
};

const updateStockProduct = async (req: Request, res: Response) => {
    try {
        const idProduct = Number(req.params['id']);
        const stock = Number(req.body.stock);

        if (isNaN(stock) || stock < 0) {
            res.status(400).json({ error: 'Invalid stock value' });
        }

        const productAfterUpdateStock = await store.updateStockProduct(
            idProduct,
            stock
        );
        res.json(productAfterUpdateStock);
    } catch (error) {
        res.json({ error: error });
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
            category_id: req.body.category,
            image: req.file ? `/uploads/${req.file.filename}` : '',
            stock: req.body.stock,
            is_active: req.body.is_active,
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

const getProductsByCategoryName = async (req: Request, res: Response) => {
    try {
        const categoryName = req.body.category;
        const products = await store.getProductsByCategoryName(categoryName);
        res.json(products);
    } catch (error) {
        res.json(error);
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
    app.put('/update-stock/:id', updateStockProduct);

    app.get('/productsByCategoryName', getProductsByCategoryName);
};

export default ProductsRoutes;

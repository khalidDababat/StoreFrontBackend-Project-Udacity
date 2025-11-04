import express, { Request, Response } from 'express';

import { Order, orderStore } from '../module/Orders.js';
import { verifyAuthToken } from './verifyAuthToken.js';

const store = new orderStore();

const index = async (_req: Request, res: Response) => {
    try {
        const orders = await store.index();
        res.json(orders);
    } catch (err) {
        res.status(400).json(err);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const o: Omit<Order, 'id'> = {
            user_id: req.body.user_id,
            status: req.body.status,
        };

        const newOrder = await store.create(o);
        res.json(newOrder);
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
};

const addProduct = async (req: Request, res: Response) => {
    try {
        const orderId = Number(req.params['id']);
        const productId: number = req.body.productId;
        const quantity: number = parseInt(req.body.quantity);

        const addedProduct = await store.addProduct(
            orderId,
            productId,
            quantity
        );
        res.json(addedProduct);
    } catch (err) {
        res.status(400).json(err);
    }
};

const currentOrderByUser = async (req: Request, res: Response) => {
    try {
        const userId: number = parseInt(req.params['userId'] ?? '');
        const orders = await store.currentOrderByUser(userId);
        res.json(orders);
    } catch (err) {
        res.status(400).json(err);
    }
};

// routes
const orderRoutes = (app: express.Application) => {
    app.get('/orders', verifyAuthToken, index);
    app.post('/orders', verifyAuthToken, create);
    app.post('/orders/:id/products', verifyAuthToken, addProduct);
    app.get('/orders/:userId', verifyAuthToken, currentOrderByUser);
};

export default orderRoutes;

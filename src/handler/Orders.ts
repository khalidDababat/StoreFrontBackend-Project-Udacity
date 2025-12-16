import express, { Request, Response } from 'express';

import { Order, orderStore } from '../module/Orders.js';
//import { verifyAuthToken } from './verifyAuthToken.js';

const store = new orderStore();

const index = async (_req: Request, res: Response) => {
    try {
        const orders = await store.index();
        res.json(orders);
    } catch (err) {
        res.status(400).json(err);
    }
};
const show = async (_req: Request, res: Response) => {
    try {
        const id = parseInt(_req.params['id'] ?? '');
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid order id' });
            return;
        }
        const order = await store.show(id);
        res.json(order);
    } catch (err) {
        res.status(400).json(err);
    }
};

const updateStatus = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params['id']!);
        const status: string = req.body.status;

        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid order id' });
            return;
        }

        const updatedOrder = await store.updateStatus(id, status);
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json(err);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const o: Omit<Order, 'id'> = {
            user_id: req.body.user_id,
            status: req.body.status,
            total_price: req.body.total_price,
            customer_name: req.body.customer_name,
            customer_phone: req.body.customer_phone,
            customer_address: req.body.customer_address,
            customer_area: req.body.customer_area,
            note: req.body.note,
        };
        const newOrder = await store.create(o);
        console.log(newOrder);
        res.json(newOrder);
    } catch (err) {
        res.status(400).json(err);
    }
};

const updatePrice = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params['id']!);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid order id' });
            return;
        }

        const updatedOrder = await store.updateTotalPrice(id);
        return res.json(updatedOrder);
    } catch (error) {
        return res.status(400).json(error);
    }
};

const deleteOrder = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params['id']!);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid order id' });
            return;
        }
        const deletedOrder = await store.delete(id);
        return res.json(deletedOrder);
    } catch (error) {
        return res.status(400).json(error);
    }
};

// routes
const orderRoutes = (app: express.Application) => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.put('/orders/:id', updateStatus);
    app.post('/orders', create);
    app.delete('/orders/:id', deleteOrder);
    app.put('/orders/price/:id', updatePrice);
};

export default orderRoutes;

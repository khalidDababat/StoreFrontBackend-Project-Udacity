import express, { Request, Response } from 'express';

import { paymentsStore, payments } from '../module/payments';

const store = new paymentsStore();

const createPayment = async (req: Request, res: Response) => {
    try {
        const pym: payments = {
            orderId: req.body.orderId,
            amount: req.body.amount,
            method: req.body.method,
            status: req.body.status,
        };
        const newPayment = await store.create(pym);
        return res.json(newPayment);
    } catch (error) {
        return res.status(400).json(`Could not create payment: ${error}`);
    }
};

const paymentsRoutes = (app: express.Application) => {
    app.post('/payments', createPayment);
};
export default paymentsRoutes;

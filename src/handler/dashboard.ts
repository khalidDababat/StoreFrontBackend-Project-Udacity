import { DashboardQueries } from './../Services/dashboard';
import express, { Request, Response } from 'express';

const dashboard = new DashboardQueries();

const getOrderDetails = async (req: Request, res: Response) => {
    try {
        const idOrder = Number(req.params['id'] ?? '');
        const data = await dashboard.getOrderDetails(idOrder);
        res.json(data);
    } catch (error) {
        res.status(404).json(error);
    }
};

const getStats = async (req: Request, res: Response) => {
    try {
        const statesStoreProduct = await dashboard.getStats();
        res.json(statesStoreProduct);
    } catch (error) {
        res.json(error);
    }
};
const dashboardRoutes = (app: express.Application) => {
    app.get('/dashboard/orders/:id', getOrderDetails);
    app.get('/get-all-states', getStats);
};

export default dashboardRoutes;

import express, { Request, Response } from 'express';

import { verifyAuthToken } from './verifyAuthToken';
import { feature, featureStore } from '../module/features';

const store = new featureStore();

//CRUD Operations

const index = async (_req: Request, res: Response) => {
    const Features = await store.index();
    console.log(Features);
    res.json(Features);
};

const show = async (_req: Request, res: Response) => {
    const id = parseInt(_req.params['id'] ?? '');
    if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid feature id' });
        return;
    }

    const Feature = await store.show(id);
    res.json(Feature);
};

const create = async (req: Request, res: Response) => {
    try {
        const feet: Omit<feature, 'id'> = {
            name: req.body.name,
        };
        const newFeature = await store.create(feet);
        res.json(newFeature);
    } catch (err) {
        res.status(400).json(err);
    }
};

const deleteFeature = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params['id'] ?? '');
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid feature id' });
            return;
        }
        const deletedFeature = await store.delete(id);
        res.json(deletedFeature);
    } catch (err) {
        res.status(400).json(err);
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params['id']!);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid feature id' });
            return;
        }
        const feet: feature = {
            id: id,
            name: req.body.name,
        };
        const updatedFeature = await store.update(feet);
        res.json({ updatedFeature, message: 'Feature updated successfully' });
    } catch (err) {
        res.status(400).json(err);
    }
};

const featureRoutes = (app: express.Application) => {
    app.get('/features', index);
    app.get('/features/:id', show);
    app.post('/features', verifyAuthToken, create);
    app.delete('/features/:id', verifyAuthToken, deleteFeature);
    app.put('/features/:id', verifyAuthToken, update);
};

export default featureRoutes;

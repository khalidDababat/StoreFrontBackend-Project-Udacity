import express, { Request, Response } from 'express';

//import { verifyAuthToken } from './verifyAuthToken';

import { ProductFeature, productFeatureStore } from '../module/productFeatures';

const store = new productFeatureStore();

// assign feature to product
async function assignFeatureToProduct(req: Request, res: Response) {
    try {
        const product_id = Number(req.body.product_id);
        const feature_id = Number(req.body.feature_id);

        if (isNaN(product_id) || isNaN(feature_id)) {
            return res.status(400).json({
                error: 'product_id and feature_id must be numbers',
            });
        }

        const pf: Omit<ProductFeature, 'id'> = {
            product_id,
            feature_id,
        };

        const newPF = await store.create(pf);
        return res.json(newPF);
    } catch (err) {
        return res.status(400).json(err);
    }
}

// get all feature by product id
const getFeaturesByProduct = async (req: Request, res: Response) => {
    try {
        const productId = parseInt(req.params['product_id']!);
        if (isNaN(productId)) {
            res.status(400).json({ error: 'Invalid product id' });
            return;
        }
        const features = await store.getFeaturesByProduct(productId);
        res.json(features);
    } catch (err) {
        res.status(400).json(err);
    }
};

const ProductFeatureRoutes = (app: express.Application) => {
    app.post('/product-features', assignFeatureToProduct);
    app.get('/product-features/:product_id', getFeaturesByProduct);
};

export default ProductFeatureRoutes;

import express, { Request, Response } from 'express';

import { ProductOrder, productOrderStore } from '../module/ProductOrder';

const store = new productOrderStore();

const assignProductToOrder = async (req: Request, res: Response) => {
    try {
        const product_id = Number(req.body.product_id);
        const order_id = Number(req.body.order_id);
        const quantity = Number(req.body.quantity);

        if (isNaN(product_id) || isNaN(order_id) || isNaN(quantity)) {
            return res.status(400).json({
                error: 'id_product, id_order, and quantity must be numbers',
            });
        }
        const po: Omit<ProductOrder, 'id'> = {
            product_id,
            order_id,
            quantity,
        };

        const newPO = await store.create(po);
        return res.json(newPO);
    } catch (err) {
        return res.status(400).json(err);
    }
};

const deleteProductByOrderId = async (req: Request, res: Response) => {
    try {
        const orderId = Number(req.params['orderId']);
        if (isNaN(orderId)) {
            return res.status(400).json({
                error: 'orderId must be a number',
            });
        }
        await store.deleteProductByOrderId(orderId);
        return res.json({
            message: `Products for order ${orderId} deleted successfully`,
        });
    } catch (error) {
        return res.status(400).json(error);
    }
};

const updateQuantity = async (req: Request, res: Response) => {
    try {
        const prodId = Number(req.params['prodId']);
        const orderID = Number(req.params['orderID']);
        const quantity = Number(req.body.quantity);
        if (isNaN(prodId) || isNaN(orderID) || isNaN(quantity)) {
            return res.status(400).json({
                error: 'prodId, orderID, and quantity must be numbers',
            });
        }
        const updatedQuantity = await store.updateQuantity(
            prodId,
            orderID,
            quantity
        );
        return res.json(updatedQuantity);
    } catch (error) {
        return res.status(400).json(error);
    }
};

const productOrderRoutes = (app: express.Application) => {
    app.post('/productOrder', assignProductToOrder);
    app.delete('/productOrder/:orderId', deleteProductByOrderId);
    app.put('/productOrder/:prodId/:orderID', updateQuantity);
};
export default productOrderRoutes;

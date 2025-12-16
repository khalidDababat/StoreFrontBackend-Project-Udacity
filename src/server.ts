import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Cross origin resource shearing to share backend to front End

import ProductsRoutes from './handler/Products.js';
import usersRoutes from './handler/Users.js';
import orderRoutes from './handler/Orders.js';
import categoryRoutes from './handler/categories.js';
import featureRoutes from './handler/features.js';
import ProductFeatureRoutes from './handler/productFeatures.js';
import productOrderRoutes from './handler/ProductOrder.js';

import dashboardRoutes from './handler/dashboard.js';

//Application Object
export const app = express();
const port: string = '4000';

// middleware
app.use(cors()); // shearing Between backend and frontend
app.use(express.json());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); //Make the uploads folder publicly accessible

ProductsRoutes(app);
usersRoutes(app);
orderRoutes(app);
categoryRoutes(app);
featureRoutes(app);
ProductFeatureRoutes(app);
productOrderRoutes(app);
dashboardRoutes(app);

app.get('/', (req: Request, res: Response) => {
    res.send('hello World');
});

app.listen(port, () => {
    console.log(`running server on http://localhost:${port}`);
});

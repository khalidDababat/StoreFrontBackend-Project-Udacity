import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Cross origin resource shearing to share backend to front End

import ProductsRoutes from './handler/Products.js';
import usersRoutes from './handler/Users.js';
import orderRoutes from './handler/Orders.js';

//Application Object
export const app = express();
const port: string = '4000';

// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); //Make the uploads folder publicly accessible

ProductsRoutes(app);
usersRoutes(app);
orderRoutes(app);

app.get('/', (req: Request, res: Response) => {
    res.send('hello World');
});

app.listen(port, () => {
    console.log(`running server on http://localhost:${port}`);
});

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import ProductsRoutes from './handler/Products.js';
import usersRoutes from './handler/Users.js';


//Application Object
const app = express();
const port: string = '4000';

app.use(bodyParser.json());

ProductsRoutes(app);
usersRoutes(app); 

app.get('/', (req: Request, res: Response) => {
    res.send('hello World');
});

app.listen(port, () => {
    console.log(`running server on http://localhost:${port}`);
});

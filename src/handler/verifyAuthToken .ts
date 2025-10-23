import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { Request, Response, NextFunction } from 'express';

export const verifyAuthToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            res.status(401).json('Access denied, no token provided');
            return;
        }
        const token = authorizationHeader.split(' ')[1] || '';
        const { TOKEN_SECRET } = process.env;
        jwt.verify(token, TOKEN_SECRET as string);
        next();
    } catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
        console.error(err);
    }
};

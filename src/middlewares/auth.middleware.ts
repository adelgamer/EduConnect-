import express, { Request, Response } from 'express';
import { UnauthorizedExcpetion } from '../../core/errors/UnauthorizedExcpetion copy.js';
import jwt, { JwtPayload } from 'jsonwebtoken';


export function authGuard(req: Request, res: Response, next: Function) {
    const jwtAuth: string | undefined = req.get('Authorization');

    if (!jwtAuth || !jwtAuth.split(" ")[1]) throw new UnauthorizedExcpetion('Unauthorized');
    const accessToken: string = jwtAuth.split(" ")[1];

    try {
        const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY || 'secret_key') as JwtPayload & { userId: string };
        req.user = user;
        next()
    } catch (err) {
        throw new UnauthorizedExcpetion('Unauthorized');
    }
}
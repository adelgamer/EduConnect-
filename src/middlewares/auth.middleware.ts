import express, { Request, Response } from 'express';
import { UnauthorizedExcpetion } from '../../core/errors/UnauthorizedExcpetion copy.js';
import jwt, { JwtPayload } from 'jsonwebtoken';


export function authGuard(req: Request, res: Response, next: Function) {
    let accessToken: string | undefined = "";
    const IS_HTTP_COOKIE = process.env.IS_HTTP_COOKIE === "true" ? true : false;
    if (IS_HTTP_COOKIE) {
        accessToken = req.cookies.accessToken;
    }
    else {
        accessToken = req.get('Authorization');
        if (!accessToken || !accessToken.split(" ")[1]) throw new UnauthorizedExcpetion('Unauthorized');
        accessToken = accessToken.split(" ")[1];
    }

    console.log('JWT', accessToken);
    try {
        const user = jwt.verify(accessToken as string, process.env.ACCESS_TOKEN_SECRET_KEY || 'secret_key') as JwtPayload & { userId: string };
        req.user = user;
        next()
    } catch (err) {
        throw new UnauthorizedExcpetion('Unauthorized');
    }
}
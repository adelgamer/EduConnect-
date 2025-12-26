import express, { Request, Response } from 'express';

export function baseMiddleware(req: Request, res: Response, next: Function) {
    next();
}

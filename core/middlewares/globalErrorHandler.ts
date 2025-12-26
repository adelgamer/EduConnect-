import express, { NextFunction, Request, Response } from 'express';

export function globalErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {

    console.log(err)

    let message;
    if (!err.statusCode) message = "There is an error in the server";
    else message = err.message;

    res.status(err.statusCode || 500).json({
        success: false,
        message,
        date: err.data || null
    })
}

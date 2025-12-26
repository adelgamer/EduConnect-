import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { BadRequestExcpetion } from '../../../core/errors/BadRequestException.js';
import * as authService from './auth.service.js';

/**
 * POST /api/auths
 */
export async function signUpController(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new BadRequestExcpetion('Validation failed', errors);

    const data = await authService.signup(req.body);
    res.status(201).json({
        success: true,
        message: "Account created successfully",
        data
    });
}

/**
 * POST /api/auths
 */
export async function loginController(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new BadRequestExcpetion('Validation failed', errors);

    const data = await authService.login(req.body);
    res.status(201).json({
        success: true,
        message: "Logged in",
        data
    });
}

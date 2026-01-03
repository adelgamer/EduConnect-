import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { BadRequestExcpetion } from '../../../core/errors/BadRequestException.js';
import * as authService from './auth.service.js';
import { DefaultDeserializer } from 'node:v8';
import { UnauthorizedExcpetion } from '../../../core/errors/UnauthorizedExcpetion.js';

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

    const data = await authService.login(req.body) as any;

    // Returning data
    if (process.env.IS_HTTP_COOKIE === 'true') {
        res.cookie('accessToken', data.accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000 // 15m
        })

        res.cookie('refreshToken', data.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
        })

        delete data.accessToken;
        delete data.refreshToken;
    }
    res.status(201).json({
        success: true,
        message: "Logged in",
        data
    });
}

/**
 * POST /api/auths
 */
export async function logoutController(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new BadRequestExcpetion('Validation failed', errors);

    const data = await authService.logout(req.user!.userId, req.body);
    res.status(201).json({
        success: true,
        message: "Logged out",
        data
    });
}

/**
 * POST /api/auths
 */
export async function logoutAllDevicesController(req: Request, res: Response) {

    const data = await authService.logoutAllDevices(req.user!.userId);
    res.status(201).json({
        success: true,
        message: "Logged out from all devices",
        data
    });
}

/**
 * POST /api/auths
 */
export async function refreshTokenController(req: Request, res: Response) {

    const refreshToken: string | undefined = req.cookies.refreshToken;
    if (!refreshToken) throw new UnauthorizedExcpetion('New refresh token')

    let data: string | null = await authService.refreshToken(refreshToken);

    // Returning data
    if (process.env.IS_HTTP_COOKIE === 'true') {
        res.cookie('accessToken', data, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000 // 15m
        })

        data = null
    }

    res.status(201).json({
        success: true,
        message: "Token refreshed",
        data
    });
}

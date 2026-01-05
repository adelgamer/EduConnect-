import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { BadRequestExcpetion } from '../../../core/errors/BadRequestException.js';
import * as userService from './user.service.js';

/**
 * GET /api/users
 */
export async function getusersController(req: Request, res: Response) {

    const cursor: string | undefined = req.query.cursor as string;
    const limit: number = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const data = await userService.getAll(cursor, limit);
    res.json({
        success: true,
        message: "users retrieved successfully",
        data
    });
}

/**
 * GET /api/users/:id
 */
export async function getuserByIdController(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) throw new BadRequestExcpetion('Identification ID is required');

    const data = await userService.getById(id);
    res.json({
        success: true,
        message: "user retrieved successfully",
        data
    });
}

/**
 * PUT /api/users/:id
 */
export async function updateUserController(req: Request, res: Response) {
    const id = req.params.id;
    const errors = validationResult(req);

    if (!id) throw new BadRequestExcpetion('Identification ID is required');
    if (!errors.isEmpty()) throw new BadRequestExcpetion('Validation failed', errors);

    const data = await userService.update(req.user!.userId, id, req.body, req.file);
    res.json({
        success: true,
        message: "user updated successfully",
        data
    });
}

/**
 * PUT /api/users/:id
 */
export async function updateUserPasswordController(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) throw new BadRequestExcpetion('Validation failed', errors);

    const data = await userService.updatePassword(req.user!.userId, req.body);
    res.json({
        success: true,
        message: "user password updated successfully",
        data
    });
}

/**
 * PUT /api/users/:id
 */
export async function updateUserAcdemicYearController(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) throw new BadRequestExcpetion('Validation failed', errors);

    const data = await userService.updateUserAcdemicYear(req.user!.userId, req.body);
    res.json({
        success: true,
        message: "user academic year updated successfully",
        data
    });
}
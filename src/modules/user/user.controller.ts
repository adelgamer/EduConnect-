import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { BadRequestExcpetion } from '../../../core/errors/BadRequestException.js';
import * as userService from './user.service.js';

/**
 * GET /api/users
 */
export async function getusersController(req: Request, res: Response) {
    const data = await userService.getAll();
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
 * POST /api/users
 */
export async function createuserController(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new BadRequestExcpetion('Validation failed', errors);

    const data = await userService.create(req.body);
    res.status(201).json({
        success: true,
        message: "user created successfully",
        data
    });
}

/**
 * PUT /api/users/:id
 */
export async function updateuserController(req: Request, res: Response) {
    const id = req.params.id;
    const errors = validationResult(req);
    
    if (!id) throw new BadRequestExcpetion('Identification ID is required');
    if (!errors.isEmpty()) throw new BadRequestExcpetion('Validation failed', errors);

    const data = await userService.update(id, req.body);
    res.json({
        success: true,
        message: "user updated successfully",
        data
    });
}

/**
 * DELETE /api/users/:id
 */
export async function deleteuserController(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) throw new BadRequestExcpetion('Identification ID is required');

    const data = await userService.remove(id);
    res.json({
        success: true,
        message: "user deleted successfully",
        data
    });
}
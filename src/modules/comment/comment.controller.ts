import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { BadRequestExcpetion } from '../../../core/errors/BadRequestException.js';
import * as commentService from './comment.service.js';

/**
 * GET /api/comments
 */
export async function getCommentsController(req: Request, res: Response) {
    const data = await commentService.getAll();
    res.json({
        success: true,
        message: "Comments retrieved successfully",
        data
    });
}

/**
 * GET /api/comments/:id
 */
export async function getCommentByIdController(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) throw new BadRequestExcpetion('Identification ID is required');

    const data = await commentService.getById(id);
    res.json({
        success: true,
        message: "Comment retrieved successfully",
        data
    });
}

/**
 * POST /api/comments
 */
export async function createCommentController(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new BadRequestExcpetion('Validation failed', errors);

    const data = await commentService.create(req.body);
    res.status(201).json({
        success: true,
        message: "Comment created successfully",
        data
    });
}

/**
 * PUT /api/comments/:id
 */
export async function updateCommentController(req: Request, res: Response) {
    const id = req.params.id;
    const errors = validationResult(req);
    
    if (!id) throw new BadRequestExcpetion('Identification ID is required');
    if (!errors.isEmpty()) throw new BadRequestExcpetion('Validation failed', errors);

    const data = await commentService.update(id, req.body);
    res.json({
        success: true,
        message: "Comment updated successfully",
        data
    });
}

/**
 * DELETE /api/comments/:id
 */
export async function deleteCommentController(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) throw new BadRequestExcpetion('Identification ID is required');

    const data = await commentService.remove(id);
    res.json({
        success: true,
        message: "Comment deleted successfully",
        data
    });
}
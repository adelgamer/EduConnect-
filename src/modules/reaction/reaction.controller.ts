import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { BadRequestExcpetion } from '../../../core/errors/BadRequestException.js';
import * as reactionService from './reaction.service.js';

/**
 * GET /api/reactions
 */
export async function getReactionsController(req: Request, res: Response) {
    const cursor = req.params.cursor || null;
    const limit: number = req.params.limit ? parseInt(req.params.limit) : 10;
    const data = await reactionService.getAll(req.params.postId, cursor, limit);
    res.json({
        success: true,
        message: "Reactions retrieved successfully",
        data
    });
}

/**
 * GET /api/reactions/:id
 */
export async function getReactionByIdController(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) throw new BadRequestExcpetion('Identification ID is required');

    const data = await reactionService.getById(id);
    res.json({
        success: true,
        message: "Reaction retrieved successfully",
        data
    });
}

/**
 * POST /api/reactions
 */
export async function createReactionController(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new BadRequestExcpetion('Validation failed', errors);

    const data = await reactionService.create(req.user!.userId, req.params.postId, req.body);
    res.status(201).json({
        success: true,
        message: `Reaction ${data ? 'created' : 'removed'} successfully`,
        data
    });
}

/**
 * PUT /api/reactions/:id
 */
// export async function updateReactionController(req: Request, res: Response) {
//     const id = req.params.id;
//     const errors = validationResult(req);

//     if (!id) throw new BadRequestExcpetion('Identification ID is required');
//     if (!errors.isEmpty()) throw new BadRequestExcpetion('Validation failed', errors);

//     const data = await reactionService.update(id, req.body);
//     res.json({
//         success: true,
//         message: "Reaction updated successfully",
//         data
//     });
// }

/**
 * DELETE /api/reactions/:id
 */
// export async function deleteReactionController(req: Request, res: Response) {
//     const id = req.params.id;
//     if (!id) throw new BadRequestExcpetion('Identification ID is required');

//     const data = await reactionService.remove(id);
//     res.json({
//         success: true,
//         message: "Reaction deleted successfully",
//         data
//     });
// }
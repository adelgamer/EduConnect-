import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { BadRequestExcpetion } from '../../../core/errors/BadRequestException.js';
import * as postService from './post.service.js';

/**
 * GET /api/posts
 */
export async function getPostsController(req: Request, res: Response) {

    const cursor: string | undefined = req.query.cursor as string;
    const limit: number = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const data = await postService.getAll(cursor, limit);
    res.json({
        success: true,
        message: "Posts retrieved successfully",
        data
    });
}

/**
 * GET /api/posts/:id
 */
export async function getPostByIdController(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) throw new BadRequestExcpetion('Identification ID is required');

    const data = await postService.getById(id);
    res.json({
        success: true,
        message: "Post retrieved successfully",
        data
    });
}

/**
 * POST /api/posts
 */
export async function createPostController(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new BadRequestExcpetion('Validation failed', errors);

    const data = await postService.create(req.user!.userId, req.body);
    res.status(201).json({
        success: true,
        message: "Post created successfully",
        data
    });
}

/**
 * PUT /api/posts/:id
 */
export async function updatePostController(req: Request, res: Response) {
    const id = req.params.id;
    const errors = validationResult(req);

    if (!id) throw new BadRequestExcpetion('Identification ID is required');
    if (!errors.isEmpty()) throw new BadRequestExcpetion('Validation failed', errors);

    const data = await postService.update(req.user!.userId, id, req.body);
    res.json({
        success: true,
        message: "Post updated successfully",
        data
    });
}

/**
 * DELETE /api/posts/:id
 */
export async function deletePostController(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) throw new BadRequestExcpetion('Identification ID is required');

    const data = await postService.remove(req.user!.userId, id);
    res.json({
        success: true,
        message: "Post deleted successfully",
        data
    });
}
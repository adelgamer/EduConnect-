import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { BadRequestExcpetion } from '../../../core/errors/BadRequestException.js';
import * as universityService from './university.service.js';

/**
 * GET /api/universitys
 */
export async function getUniversitysController(req: Request, res: Response) {
    const data = await universityService.getAll();
    res.json({
        success: true,
        message: "Universitys retrieved successfully",
        data
    });
}

/**
 * GET /api/universitys/:id
 */
export async function getUniversityByIdController(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) throw new BadRequestExcpetion('Identification ID is required');

    const data = await universityService.getById(id);
    res.json({
        success: true,
        message: "University retrieved successfully",
        data
    });
}

/**
 * POST /api/universitys
 */
export async function createUniversityController(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new BadRequestExcpetion('Validation failed', errors);

    const data = await universityService.create(req.body);
    res.status(201).json({
        success: true,
        message: "University created successfully",
        data
    });
}

/**
 * PUT /api/universitys/:id
 */
export async function updateUniversityController(req: Request, res: Response) {
    const id = req.params.id;
    const errors = validationResult(req);
    
    if (!id) throw new BadRequestExcpetion('Identification ID is required');
    if (!errors.isEmpty()) throw new BadRequestExcpetion('Validation failed', errors);

    const data = await universityService.update(id, req.body);
    res.json({
        success: true,
        message: "University updated successfully",
        data
    });
}

/**
 * DELETE /api/universitys/:id
 */
export async function deleteUniversityController(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) throw new BadRequestExcpetion('Identification ID is required');

    const data = await universityService.remove(id);
    res.json({
        success: true,
        message: "University deleted successfully",
        data
    });
}
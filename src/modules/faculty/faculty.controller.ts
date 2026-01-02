import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { BadRequestExcpetion } from '../../../core/errors/BadRequestException.js';
import * as facultyService from './faculty.service.js';

/**
 * GET /api/facultys
 */
export async function getFacultysController(req: Request, res: Response) {
    const data = await facultyService.getAll();
    res.json({
        success: true,
        message: "Facultys retrieved successfully",
        data
    });
}

/**
 * GET /api/facultys/:id
 */
export async function getFacultyByIdController(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) throw new BadRequestExcpetion('Identification ID is required');

    const data = await facultyService.getById(id);
    res.json({
        success: true,
        message: "Faculty retrieved successfully",
        data
    });
}

/**
 * POST /api/facultys
 */
export async function createFacultyController(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new BadRequestExcpetion('Validation failed', errors);

    const data = await facultyService.create(req.body);
    res.status(201).json({
        success: true,
        message: "Faculty created successfully",
        data
    });
}

/**
 * PUT /api/facultys/:id
 */
export async function updateFacultyController(req: Request, res: Response) {
    const id = req.params.id;
    const errors = validationResult(req);
    
    if (!id) throw new BadRequestExcpetion('Identification ID is required');
    if (!errors.isEmpty()) throw new BadRequestExcpetion('Validation failed', errors);

    const data = await facultyService.update(id, req.body);
    res.json({
        success: true,
        message: "Faculty updated successfully",
        data
    });
}

/**
 * DELETE /api/facultys/:id
 */
export async function deleteFacultyController(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) throw new BadRequestExcpetion('Identification ID is required');

    const data = await facultyService.remove(id);
    res.json({
        success: true,
        message: "Faculty deleted successfully",
        data
    });
}
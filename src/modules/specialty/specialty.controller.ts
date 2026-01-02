import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { BadRequestExcpetion } from '../../../core/errors/BadRequestException.js';
import * as specialtyService from './specialty.service.js';

/**
 * GET /api/specialtys
 */
export async function getSpecialtysController(req: Request, res: Response) {
    const data = await specialtyService.getAll();
    res.json({
        success: true,
        message: "Specialtys retrieved successfully",
        data
    });
}

/**
 * GET /api/specialtys/:id
 */
export async function getSpecialtyByIdController(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) throw new BadRequestExcpetion('Identification ID is required');

    const data = await specialtyService.getById(id);
    res.json({
        success: true,
        message: "Specialty retrieved successfully",
        data
    });
}

/**
 * POST /api/specialtys
 */
export async function createSpecialtyController(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new BadRequestExcpetion('Validation failed', errors);

    const data = await specialtyService.create(req.body);
    res.status(201).json({
        success: true,
        message: "Specialty created successfully",
        data
    });
}

/**
 * PUT /api/specialtys/:id
 */
export async function updateSpecialtyController(req: Request, res: Response) {
    const id = req.params.id;
    const errors = validationResult(req);
    
    if (!id) throw new BadRequestExcpetion('Identification ID is required');
    if (!errors.isEmpty()) throw new BadRequestExcpetion('Validation failed', errors);

    const data = await specialtyService.update(id, req.body);
    res.json({
        success: true,
        message: "Specialty updated successfully",
        data
    });
}

/**
 * DELETE /api/specialtys/:id
 */
export async function deleteSpecialtyController(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) throw new BadRequestExcpetion('Identification ID is required');

    const data = await specialtyService.remove(id);
    res.json({
        success: true,
        message: "Specialty deleted successfully",
        data
    });
}
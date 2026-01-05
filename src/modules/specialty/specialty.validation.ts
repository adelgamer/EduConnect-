import { body } from 'express-validator';

export const createSpecialtyValidationSchema = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),
    body('shortName')
        .optional()
        .trim()
        .isLength({ max: 12 }).withMessage('Short name cannot exceed 12 characters'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
    body('facultyId')
        .notEmpty().withMessage('Faculty ID is required')
        .isUUID().withMessage('Invalid Faculty ID format'),
];

export const updateSpecialtyValidationSchema = [
    body('name')
        .optional()
        .trim()
        .notEmpty().withMessage('Name cannot be empty')
        .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),
    body('shortName')
        .optional()
        .trim()
        .isLength({ max: 12 }).withMessage('Short name cannot exceed 12 characters'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
    body('facultyId')
        .optional()
        .isUUID().withMessage('Invalid Faculty ID format'),
];

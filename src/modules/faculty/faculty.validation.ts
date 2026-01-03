import { body } from 'express-validator';

export const createFacultyValidationSchema = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),
    body('shortName')
        .isLength({ max: 12 }).withMessage('Short name cannot exceed 12 characters'),
    body('description')
        .trim()
        .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
    body('website')
        .trim()
        .isLength({ max: 2048 }).withMessage('Website cannot exceed 2048 characters'),
    body('universityId')
        .trim()
        .notEmpty().withMessage('University ID is required')
];

export const updateFacultyValidationSchema = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),
    body('shortName')
        .isLength({ max: 12 }).withMessage('Short name cannot exceed 12 characters'),
    body('description')
        .trim()
        .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
    body('website')
        .trim()
        .isLength({ max: 2048 }).withMessage('Website cannot exceed 2048 characters'),
    body('universityId')
        .trim()
        .notEmpty().withMessage('University ID is required')
];

import { body } from 'express-validator';

export const createUniversityValidationSchema = [
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
    body('location')
        .trim()
        .notEmpty().withMessage('Location is required')
        .isLength({ max: 100 }).withMessage('Location cannot exceed 100 characters'),
    body('website')
        .optional()
        .trim()
        .isURL().withMessage('Website must be a valid URL')
        .isLength({ max: 2048 }).withMessage('Website cannot exceed 2048 characters'),

];

export const updateUniversityValidationSchema = [
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
    body('location')
        .trim()
        .notEmpty().withMessage('Location is required')
        .isLength({ max: 100 }).withMessage('Location cannot exceed 100 characters'),
    body('website')
        .optional()
        .trim()
        .isURL().withMessage('Website must be a valid URL')
        .isLength({ max: 2048 }).withMessage('Website cannot exceed 2048 characters'),
];

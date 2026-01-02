import { body } from 'express-validator';

export const createSpecialtyValidationSchema = [
    // example:
    // body('title')
    //     .trim()
    //     .notEmpty().withMessage('Title is required')
    //     .isLength({ max: 255 }).withMessage('Title cannot exceed 255 characters'),
];

export const updateSpecialtyValidationSchema = [
    // example:
    // body('title')
    //     .trim()
    //     .notEmpty().withMessage('Title is required')
    //     .isLength({ max: 255 }).withMessage('Title cannot exceed 255 characters'),
];

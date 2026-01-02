import { body } from 'express-validator';

export const createUniversityValidationSchema = [
    // example:
    // body('title')
    //     .trim()
    //     .notEmpty().withMessage('Title is required')
    //     .isLength({ max: 255 }).withMessage('Title cannot exceed 255 characters'),
];

export const updateUniversityValidationSchema = [
    // example:
    // body('title')
    //     .trim()
    //     .notEmpty().withMessage('Title is required')
    //     .isLength({ max: 255 }).withMessage('Title cannot exceed 255 characters'),
];

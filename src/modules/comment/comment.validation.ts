import { body } from 'express-validator';

export const createCommentValidationSchema = [
    // example:
    // body('title')
    //     .trim()
    //     .notEmpty().withMessage('Title is required')
    //     .isLength({ max: 255 }).withMessage('Title cannot exceed 255 characters'),
];

export const updateCommentValidationSchema = [
    // example:
    // body('title')
    //     .trim()
    //     .notEmpty().withMessage('Title is required')
    //     .isLength({ max: 255 }).withMessage('Title cannot exceed 255 characters'),
];

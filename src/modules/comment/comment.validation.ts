import { body, param } from 'express-validator';

export const createCommentValidationSchema = [
    // example:
    param('postId')
        .trim()
        .notEmpty().withMessage('Post id is required'),
    body('content')
        .trim()
        .notEmpty().withMessage('Comment content is required'),
];

export const updateCommentValidationSchema = [
    // example:
    // body('title')
    //     .trim()
    //     .notEmpty().withMessage('Title is required')
    //     .isLength({ max: 255 }).withMessage('Title cannot exceed 255 characters'),
];

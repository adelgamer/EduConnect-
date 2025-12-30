import { body, param, query } from 'express-validator';

export const createCommentValidationSchema = [
    // example:
    param('postId')
        .trim()
        .notEmpty().withMessage('Post id is required'),
    body('content')
        .trim()
        .notEmpty().withMessage('Comment content is required'),
];

export const fetchAllPostCommentsValidationSchema = [
    param('postId')
        .trim()
        .notEmpty().withMessage('postId is required'),
    query('cursor')
        .optional().isString(),
    query('limit')
        .optional()
        .isInt().withMessage('Limit must be an integer'),
];

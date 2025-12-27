import { body } from 'express-validator';
import { PostType } from '../../../generated/prisma/enums.js';

export const createPostValidationSchema = [
    // title: Optional (String?), max 150 chars (matches @db.VarChar(150))
    body('title')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 150 }).withMessage('Title cannot exceed 150 characters'),

    // content: Required, no specific max length (matches @db.Text)
    body('content')
        .trim()
        .notEmpty().withMessage('Content is required')
        .isLength({ min: 10 }).withMessage('Content must be at least 10 characters long'),

    // postType: Optional (defaults to DISCUSSION), must match Enum values
    body('postType')
        .optional()
        .trim()
        .isIn(Object.values(PostType)) // Replace with your actual PostType enum values
        .withMessage('Invalid post type provided'),
];
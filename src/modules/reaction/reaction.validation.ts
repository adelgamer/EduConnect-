import { body, param } from 'express-validator';
import { ReactionType } from '../../../generated/prisma/enums.js';

export const createReactionValidationSchema = [
    body('reactionType')
        .trim()
        .notEmpty().withMessage('reactionType is required')
        .isIn(Object.values(ReactionType)),

    param('postId')
        .trim()
        .notEmpty().withMessage('postId is required'),
];

export const updateReactionValidationSchema = [
    // example:
    // body('title')
    //     .trim()
    //     .notEmpty().withMessage('Title is required')
    //     .isLength({ max: 255 }).withMessage('Title cannot exceed 255 characters'),
];

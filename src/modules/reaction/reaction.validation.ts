import { body, param, query } from 'express-validator';
import { ReactionType } from '../../../generated/prisma/enums.js';
import { EntityType } from './reaction.service.js';

export const createReactionValidationSchema = [
    body('reactionType')
        .trim()
        .notEmpty().withMessage('reactionType is required')
        .isIn(Object.values(ReactionType)),

    param('entityId')
        .trim()
        .notEmpty().withMessage('entityId is required'),

    param('entityType')
        .trim()
        .isIn(Object.values(EntityType))
        .notEmpty().withMessage('entityType is required'),
];

export const updateReactionValidationSchema = [
    // example:
    // body('title')
    //     .trim()
    //     .notEmpty().withMessage('Title is required')
    //     .isLength({ max: 255 }).withMessage('Title cannot exceed 255 characters'),
];

export const getAllReactionsValidationShcema = [
    // example:
    param('entityId')
        .trim()
        .notEmpty().withMessage('entityId is required'),

    param('entityType')
        .trim()
        .isIn(Object.values(EntityType))
        .notEmpty().withMessage('entityType is required'),
    // example:
    query('cursor')
        .optional().isString(),
    // example:
    query('limit')
        .optional()
        .isInt().withMessage('Limit must be an integer'),
];

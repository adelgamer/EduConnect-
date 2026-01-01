import express from 'express';
import { checkSchema } from 'express-validator';
import * as reactionController from './reaction.controller.js';
import { createReactionValidationSchema, getAllReactionsValidationShcema, updateReactionValidationSchema } from './reaction.validation.js';
import { authGuard } from '../../middlewares/auth.middleware.js';

/**
 * Express router for Reaction module.
 * Maps HTTP verbs to controller functions.
 */
const reactionRouter = express.Router();
reactionRouter.use(authGuard);

/**
 * @swagger
 * tags:
 *   name: Reaction
 *   description: Reaction management and retrieval
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Reaction:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The reaction ID
 *         userId:
 *           type: string
 *           description: The ID of the user who reacted
 *         postId:
 *           type: string
 *           description: The ID of the post reacted to
 *         reactionType:
 *           type: string
 *           enum: [LIKE, HELPFUL, EASY, TOUGH, FIRE, MIND_BLOWN]
 *           description: The type of reaction
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 */

/**
 * @swagger
 * /reaction/{entityId}/{entityType}:
 *   get:
 *     summary: Retrieve all Reactions for a specific Post or Comment
 *     tags: [Reaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: entityId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post or comment
 *       - in: path
 *         name: entityType
 *         required: true
 *         schema:
 *           type: string
 *           enum: [POST, COMMENT]
 *         description: The type of entity
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: string
 *         description: Cursor for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of reactions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Reactions retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     reactions:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Reaction'
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         hasNextPage:
 *                           type: boolean
 *                         nextCursor:
 *                           type: string
 *                           nullable: true
 *                         count:
 *                           type: integer
 */
reactionRouter.get('/:entityId/:entityType', getAllReactionsValidationShcema, reactionController.getReactionsController);

/**
 * @swagger
 * /reaction/{id}/reaction:
 *   get:
 *     summary: Retrieve a single Reaction by ID
 *     tags: [Reaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The reaction ID
 *     responses:
 *       200:
 *         description: Reaction retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Reaction retrieved successfully
 *                 data:
 *                   $ref: '#/components/schemas/Reaction'
 *       404:
 *         description: Reaction not found
 */
reactionRouter.get('/:id/reaction', reactionController.getReactionByIdController);

/**
 * @swagger
 * /reaction/{entityId}/{entityType}:
 *   post:
 *     summary: Create or Toggle a Reaction for a Post or Comment
 *     description: If a reaction of the same type by the same user already exists, it will be removed (toggled off). If a different reaction type exists, it will be updated.
 *     tags: [Reaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: entityId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post or comment to react to
 *       - in: path
 *         name: entityType
 *         required: true
 *         schema:
 *           type: string
 *           enum: [POST, COMMENT]
 *         description: The type of entity being reacted to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reactionType
 *             properties:
 *               reactionType:
 *                 type: string
 *                 enum: [LIKE, HELPFUL, EASY, TOUGH, FIRE, MIND_BLOWN]
 *     responses:
 *       201:
 *         description: Reaction processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Reaction created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Reaction'
 *       400:
 *         description: Validation failed
 */
reactionRouter.post('/:entityId/:entityType', createReactionValidationSchema, reactionController.createReactionController);

export default reactionRouter; 
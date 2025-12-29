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
 * /reaction:
 *   get:
 *     summary: Retrieve all Reactions
 *     tags: [Reaction]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of Reactions retrieved successfully
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
 *                   example: reactions retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Reaction'
 */
reactionRouter.get('/:postId', getAllReactionsValidationShcema, reactionController.getReactionsController);

/**
 * @swagger
 * /reaction/{id}:
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
 *                   example: reaction retrieved successfully
 *                 data:
 *                   $ref: '#/components/schemas/Reaction'
 *       404:
 *         description: Reaction not found
 */
reactionRouter.get('/:id/reaction', reactionController.getReactionByIdController);

/**
 * @swagger
 * /reaction:
 *   post:
 *     summary: Create a new Reaction
 *     tags: [Reaction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               # Add properties here
 *               exampleProperty:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reaction created successfully
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
 *                   example: reaction created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Reaction'
 */
reactionRouter.post('/:postId', createReactionValidationSchema, reactionController.createReactionController);

/**
 * @swagger
 * /reaction/{id}:
 *   put:
 *     summary: Update an existing Reaction
 *     tags: [Reaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The reaction ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               # Add properties here
 *               exampleProperty:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reaction updated successfully
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
 *                   example: reaction updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Reaction'
 */
reactionRouter.put('/:id', updateReactionValidationSchema, reactionController.updateReactionController);

/**
 * @swagger
 * /reaction/{id}:
 *   delete:
 *     summary: Delete a Reaction record
 *     tags: [Reaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The reaction ID to delete
 *     responses:
 *       200:
 *         description: Reaction deleted successfully
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
 *                   example: reaction deleted successfully
 */
reactionRouter.delete('/:id', reactionController.deleteReactionController);

export default reactionRouter;
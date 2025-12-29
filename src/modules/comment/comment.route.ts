import express from 'express';
import { checkSchema } from 'express-validator';
import * as commentController from './comment.controller.js';
import { createCommentValidationSchema, updateCommentValidationSchema } from './comment.validation.js';
import { authGuard } from '../../middlewares/auth.middleware.js';

/**
 * Express router for Comment module.
 * Maps HTTP verbs to controller functions.
 */
const commentRouter = express.Router();
commentRouter.use(authGuard);

/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: Comment management and retrieval
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The comment ID
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
 * /comment:
 *   get:
 *     summary: Retrieve all Comments
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of Comments retrieved successfully
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
 *                   example: comments retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 */
commentRouter.get('/', commentController.getCommentsController);

/**
 * @swagger
 * /comment/{id}:
 *   get:
 *     summary: Retrieve a single Comment by ID
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: Comment retrieved successfully
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
 *                   example: comment retrieved successfully
 *                 data:
 *                   $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comment not found
 */
commentRouter.get('/:id', commentController.getCommentByIdController);

/**
 * @swagger
 * /comment:
 *   post:
 *     summary: Create a new Comment
 *     tags: [Comment]
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
 *         description: Comment created successfully
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
 *                   example: comment created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Comment'
 */
commentRouter.post('/:postId', createCommentValidationSchema, commentController.createCommentController);

/**
 * @swagger
 * /comment/{id}:
 *   put:
 *     summary: Update an existing Comment
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID to update
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
 *         description: Comment updated successfully
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
 *                   example: comment updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Comment'
 */
commentRouter.put('/:id', updateCommentValidationSchema, commentController.updateCommentController);

/**
 * @swagger
 * /comment/{id}:
 *   delete:
 *     summary: Delete a Comment record
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID to delete
 *     responses:
 *       200:
 *         description: Comment deleted successfully
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
 *                   example: comment deleted successfully
 */
commentRouter.delete('/:id', commentController.deleteCommentController);

export default commentRouter;
import express from 'express';
import { checkSchema } from 'express-validator';
import * as commentController from './comment.controller.js';
import { createCommentValidationSchema, fetchAllPostCommentsValidationSchema, updateCommentValidationSchema } from './comment.validation.js';
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
 *         postId:
 *           type: string
 *           description: The ID of the post the comment belongs to
 *         userId:
 *           type: string
 *           description: The ID of the user who created the comment
 *         content:
 *           type: string
 *           description: The content of the comment
 *         isDeleted:
 *           type: boolean
 *           description: Soft delete flag
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
 * /comment/post/{postId}/comments:
 *   get:
 *     summary: Retrieve all Comments for a specific post
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID to fetch comments for
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
 *                   example: Comments retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     comments:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Comment'
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
commentRouter.get('/post/:postId/comments', fetchAllPostCommentsValidationSchema, commentController.getCommentsController);

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
 *                   example: Comment retrieved successfully
 *                 data:
 *                   $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comment not found
 */
commentRouter.get('/:id', commentController.getCommentByIdController);

/**
 * @swagger
 * /comment/{postId}:
 *   post:
 *     summary: Create a new Comment
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID to comment on
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: The content of the comment
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
 *                   example: Comment created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Validation failed
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
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: The new content of the comment
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
 *                   example: Comment updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Comment not found
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
 *                   example: Comment deleted successfully
 *                 data:
 *                   $ref: '#/components/schemas/Comment'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 */
commentRouter.delete('/:id', commentController.deleteCommentController);

export default commentRouter;
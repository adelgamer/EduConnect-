import express from 'express';
import { checkSchema } from 'express-validator';
import * as postController from './post.controller.js';
import { createPostValidationSchema } from './post.validation.js';
import { authGuard } from '../../middlewares/auth.middleware.js';
import { validateGetAllQuery } from '../user/user.validation.js';

/**
 * Express router for Post module.
 * Maps HTTP verbs to controller functions.
 */
const postRouter = express.Router();
postRouter.use(authGuard);

/**
 * @swagger
 * tags:
 *   name: Post
 *   description: Post management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The post ID
 *         userId:
 *           type: string
 *           description: The ID of the user who created the post
 *         title:
 *           type: string
 *           nullable: true
 *           description: The title of the post
 *         content:
 *           type: string
 *           description: The content of the post
 *         postType:
 *           type: string
 *           enum: [QUESTION, ANSWER, ANNOUNCEMENT, STUDY_TIP, EXPLANATION, RESOURCE, PDF_RESOURCE, SUMMARY, AI_SUMMARY, AI_QUESTION, POLL, DISCUSSION, EVENT]
 *           default: DISCUSSION
 *         reactionCount:
 *           type: integer
 *           description: Number of reactions
 *         commentCount:
 *           type: integer
 *           description: Number of comments
 *         isDeleted:
 *           type: boolean
 *           description: Soft delete flag
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Retrieve all Posts
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *         description: List of posts retrieved successfully
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
 *                   example: Posts retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     posts:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Post'
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
postRouter.get('/', validateGetAllQuery, postController.getPostsController);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Retrieve a single Post by ID
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *     responses:
 *       200:
 *         description: Post retrieved successfully
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
 *                   example: Post retrieved successfully
 *                 data:
 *                   $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 */
postRouter.get('/:id', postController.getPostByIdController);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new Post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 150
 *               content:
 *                 type: string
 *                 minLength: 10
 *               postType:
 *                 type: string
 *                 enum: [QUESTION, ANSWER, ANNOUNCEMENT, STUDY_TIP, EXPLANATION, RESOURCE, PDF_RESOURCE, SUMMARY, AI_SUMMARY, AI_QUESTION, POLL, DISCUSSION, EVENT]
 *                 default: DISCUSSION
 *     responses:
 *       201:
 *         description: Post created successfully
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
 *                   example: Post created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Post'
 *       400:
 *         description: Validation failed
 */
postRouter.post('/', createPostValidationSchema, postController.createPostController);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update an existing Post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 150
 *               content:
 *                 type: string
 *                 minLength: 10
 *               postType:
 *                 type: string
 *                 enum: [QUESTION, ANSWER, ANNOUNCEMENT, STUDY_TIP, EXPLANATION, RESOURCE, PDF_RESOURCE, SUMMARY, AI_SUMMARY, AI_QUESTION, POLL, DISCUSSION, EVENT]
 *     responses:
 *       200:
 *         description: Post updated successfully
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
 *                   example: Post updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Post'
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */
postRouter.put('/:id', createPostValidationSchema, postController.updatePostController);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a Post record
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *     responses:
 *       200:
 *         description: Post deleted successfully
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
 *                   example: Post deleted successfully
 *                 data:
 *                   $ref: '#/components/schemas/Post'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */
postRouter.delete('/:id', postController.deletePostController);

export default postRouter;
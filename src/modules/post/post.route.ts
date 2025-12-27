import express from 'express';
import { checkSchema } from 'express-validator';
import * as postController from './post.controller.js';
import { createPostValidationSchema } from './post.validation.js';
import { authGuard } from '../../middlewares/auth.middleware.js';

/**
 * Express router for Post module.
 * Maps HTTP verbs to controller functions.
 */
const postRouter = express.Router();
postRouter.use(authGuard);

/**
 * @route   GET /api/posts
 * @desc    Retrieve all Posts
 */
postRouter.get('/', postController.getPostsController);

/**
 * @route   GET /api/posts/:id
 * @desc    Retrieve a single Post by ID
 */
postRouter.get('/:id', postController.getPostByIdController);

/**
 * @route   POST /api/posts
 * @desc    Create a new Post
 */
postRouter.post('/', createPostValidationSchema, postController.createPostController);

/**
 * @route   PUT /api/posts/:id
 * @desc    Update an existing Post
 */
postRouter.put('/:id', postController.updatePostController);

/**
 * @route   DELETE /api/posts/:id
 * @desc    Delete a Post record
 */
postRouter.delete('/:id', postController.deletePostController);

export default postRouter;
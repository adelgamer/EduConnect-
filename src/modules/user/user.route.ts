import express from 'express';
import { checkSchema } from 'express-validator';
import * as userController from './user.controller.js';

/**
 * Express router for user module.
 * Maps HTTP verbs to controller functions.
 */
const userRouter = express.Router();

/**
 * @route   GET /api/users
 * @desc    Retrieve all users
 */
userRouter.get('/', userController.getusersController);

/**
 * @route   GET /api/users/:id
 * @desc    Retrieve a single user by ID
 */
userRouter.get('/:id', userController.getuserByIdController);

/**
 * @route   POST /api/users
 * @desc    Create a new user
 */
userRouter.post('/', userController.createuserController);

/**
 * @route   PUT /api/users/:id
 * @desc    Update an existing user
 */
userRouter.put('/:id', userController.updateuserController);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete a user record
 */
userRouter.delete('/:id', userController.deleteuserController);

export default userRouter;
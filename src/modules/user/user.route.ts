import express from 'express';
import { checkSchema } from 'express-validator';
import * as userController from './user.controller.js';
import { updateUserPasswordValidationSchema, updateUserValidationSchema, validateGetAllQuery } from './user.validation.js';
import { authGuard } from '../../middlewares/auth.middleware.js';

/**
 * Express router for user module.
 * Maps HTTP verbs to controller functions.
 */
const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management and retrieval
 */

userRouter.use(authGuard);

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Retrieve all users
 *     tags: [User]
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
 *         description: List of users retrieved successfully
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
 *                   example: users retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */
userRouter.get('/', validateGetAllQuery, userController.getusersController);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Retrieve a single user by ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User retrieved successfully
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
 *                   example: user retrieved successfully
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
userRouter.get('/:id', userController.getuserByIdController);

/**
 * @swagger
 * /user/update-password:
 *   put:
 *     summary: Update user password
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: New password
 *                 example: newSuperSecret123
 *     responses:
 *       200:
 *         description: Password updated successfully
 */
userRouter.put('/update-password', updateUserPasswordValidationSchema, userController.updateUserPasswordController);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update an existing user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 maxLength: 25
 *               lastName:
 *                 type: string
 *                 maxLength: 25
 *               username:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 25
 *               bio:
 *                 type: string
 *                 maxLength: 200
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/User'
 */
userRouter.put('/:id', updateUserValidationSchema, userController.updateuserController);


export default userRouter;
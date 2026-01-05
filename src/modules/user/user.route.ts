import express from 'express';
import { checkSchema } from 'express-validator';
import * as userController from './user.controller.js';
import { updateUserAcdemicYear, updateUserPasswordValidationSchema, updateUserValidationSchema, validateGetAllQuery } from './user.validation.js';
import { authGuard } from '../../middlewares/auth.middleware.js';
import instanciateMulter from '../../../core/multer/multerIntance.js';

/**
 * Express router for user module.
 * Maps HTTP verbs to controller functions.
 */
const userRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         firstName:
 *           type: string
 *           example: John
 *         lastName:
 *           type: string
 *           example: Doe
 *         username:
 *           type: string
 *           example: johndoe123
 *         email:
 *           type: string
 *           format: email
 *           example: john.doe@example.com
 *         bio:
 *           type: string
 *           nullable: true
 *           example: Computer science student interested in AI.
 *         academicYear:
 *           type: string
 *           enum: [L1, L2, L3, M1, M2, D1, D2, D3, D4, D5]
 *           nullable: true
 *         profilePhoto:
 *           type: string
 *           nullable: true
 *           example: uploads/profileImages/johndoe.jpg
 *         specialityId:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management and retrieval
 */
const upload = instanciateMulter('./uploads/profileImages');
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
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
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
 *           format: uuid
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
 *           format: uuid
 *         description: The user ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profileImageFile:
 *                 type: string
 *                 format: binary
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
userRouter.put('/:id', upload.single('profileImageFile'), updateUserValidationSchema, userController.updateUserController);


/**
 * @swagger
 * /user/academic-year/{id}:
 *   put:
 *     summary: Update user academic year
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The user ID (although the authenticated user updates their own record)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - academicYear
 *             properties:
 *               academicYear:
 *                 type: string
 *                 enum: [L1, L2, L3, M1, M2, D1, D2, D3, D4, D5]
 *                 example: L3
 *     responses:
 *       200:
 *         description: Academic year updated successfully
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
userRouter.put('/academic-year/:id', updateUserAcdemicYear, userController.updateUserAcdemicYearController);


export default userRouter; 
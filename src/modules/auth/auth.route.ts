import express from 'express';
import { checkSchema } from 'express-validator';
import * as authController from './auth.controller.js';
import { signupValidationSchema, loginValditionSchema, logoutValditionSchema } from './auth.validation.js';
import { authGuard } from '../../middlewares/auth.middleware.js';

/**
 * Express router for auth module.
 * Maps HTTP verbs to controller functions.
 */
const authRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and Token Management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The user ID
 *         username:
 *           type: string
 *           description: The user's username
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         bio:
 *           type: string
 *           description: User biography
 *         role:
 *           type: string
 *           enum: [USER, ADMIN]
 *     AuthResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             accessToken:
 *               type: string
 *             refreshToken:
 *               type: string
 *             user:
 *               $ref: '#/components/schemas/User'
 */



/**
 * @swagger
 * /auth/sign-up:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - username
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 maxLength: 25
 *                 example: John
 *               lastName:
 *                 type: string
 *                 maxLength: 25
 *                 example: Doe
 *               username:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 25
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 format: email
 *                 maxLength: 254
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 format: password
 *                 example: superSecret123
 *               bio:
 *                 type: string
 *                 maxLength: 200
 *                 example: Software Engineer
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Validation error
 */
authRouter.post('/sign-up', signupValidationSchema, authController.signUpController);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: superSecret123
 *     responses:
 *       201:
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: accessToken=abcde12345; Path=/; HttpOnly
 *       400:
 *         description: Invalid credentials or validation error
 */
authRouter.post('/login', loginValditionSchema, authController.loginController);
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: The refresh token to invalidate
 *                 example: abc.123.efg
 *     responses:
 *       201:
 *         description: Logged out successfully
 *       401:
 *         description: Unauthorized
 */
authRouter.post('/logout', authGuard, logoutValditionSchema, authController.logoutController);
/**
 * @swagger
 * /auth/logout-all-devices:
 *   post:
 *     summary: Logout user from all devices
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Logged out from all devices successfully
 *       401:
 *         description: Unauthorized
 */
authRouter.post('/logout-all-devices', authGuard, authController.logoutAllDevicesController);
/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     parameters:
 *       - in: cookie
 *         name: refreshToken
 *         schema:
 *           type: string
 *         required: true
 *         description: Refresh token from cookies
 *     responses:
 *       201:
 *         description: Token refreshed
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
 *                   example: Token refreshed
 *       401:
 *         description: Invalid or missing refresh token
 */
authRouter.post('/refresh-token', authController.refreshTokenController);
/**
 * @swagger
 * /auth/protected-route:
 *   get:
 *     summary: Example protected route
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: YOU ARE SEEING SOMETHING THAT SHOULD BE PROTECTED 123
 */
authRouter.get('/protected-route', authGuard, (req, res) => {
    res.send('YOU ARE SEEING SOMETHING THAT SHOULD BE PROTECTED ' + req.user?.userId);
});


export default authRouter;
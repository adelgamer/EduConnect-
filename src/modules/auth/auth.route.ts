import express from 'express';
import { checkSchema } from 'express-validator';
import * as authController from './auth.controller.js';
import { signupValidationSchema, loginValditionSchema } from './auth.validation.js';

/**
 * Express router for auth module.
 * Maps HTTP verbs to controller functions.
 */
const authRouter = express.Router();


/**
 * @route   POST /api/auths
 * @desc    Create a new auth
 */
authRouter.post('/sign-up', signupValidationSchema, authController.signUpController);
authRouter.post('/login', loginValditionSchema, authController.loginController);


export default authRouter;
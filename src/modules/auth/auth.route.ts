import express from 'express';
import { checkSchema } from 'express-validator';
import * as authController from './auth.controller.js';
import { userValidationSchema } from './auth.validation.js';

/**
 * Express router for auth module.
 * Maps HTTP verbs to controller functions.
 */
const authRouter = express.Router();


/**
 * @route   POST /api/auths
 * @desc    Create a new auth
 */
authRouter.post('/sign-up', userValidationSchema, authController.signUpController);


export default authRouter;
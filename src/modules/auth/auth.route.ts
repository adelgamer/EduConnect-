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
 * @route   POST /api/auths
 * @desc    Create a new auth
 */
authRouter.post('/sign-up', signupValidationSchema, authController.signUpController);
authRouter.post('/login', loginValditionSchema, authController.loginController);
authRouter.post('/logout', authGuard, logoutValditionSchema, authController.logoutController);
// authRouter.get('/protected-route', authGuard, (req, res) => {
//     res.send('YOU ARE SEEING SOMETHING THAT SHOULD BE PROTECTED ' + req.user?.userId);
// });


export default authRouter;
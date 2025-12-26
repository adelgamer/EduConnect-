import authRouter from './modules/auth/auth.route.js';
import express from 'express';

const mainRouter = express.Router();

mainRouter.use('/auth', authRouter);

export default mainRouter;

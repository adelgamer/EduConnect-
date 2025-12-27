import testModuleRouter from './modules/testModule/testModule.route.js';
import postRouter from './modules/post/post.route.js';
import userRouter from './modules/user/user.route.js';
import authRouter from './modules/auth/auth.route.js';
import express from 'express';

const mainRouter = express.Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/user', userRouter);
mainRouter.use('/post', postRouter);

export default mainRouter;

import commentRouter from './modules/comment/comment.route.js';
import reactionRouter from './modules/reaction/reaction.route.js';
import postRouter from './modules/post/post.route.js';
import userRouter from './modules/user/user.route.js';
import authRouter from './modules/auth/auth.route.js';
import express from 'express';

const mainRouter = express.Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/user', userRouter);
mainRouter.use('/post', postRouter);
mainRouter.use('/reaction', reactionRouter);
mainRouter.use('/comment', commentRouter);

export default mainRouter;

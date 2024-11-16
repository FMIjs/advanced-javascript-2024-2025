const apiRouter = require('express').Router();
const userRouter = require('./user');

apiRouter.use('/user', userRouter);

module.exports = apiRouter;
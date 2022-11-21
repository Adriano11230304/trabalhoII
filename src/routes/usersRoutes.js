const express = require('express');

const userRouter = express.Router();

const UserController = require('../controllers/userController');
const userController = new UserController;

userRouter.post('/userAuth', userController.userAuth);
userRouter.get('/add', userController.add);
userRouter.post('/add', userController.addPost);

module.exports = userRouter;
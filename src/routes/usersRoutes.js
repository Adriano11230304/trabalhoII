const express = require('express');
const { isAuth } = require('../middlewares/isAuth');
const { isAdmin } = require('../middlewares/isAdmin');
const userRouter = express.Router();
const UserController = require('../controllers/userController');
const userController = new UserController;

userRouter.post('/userAuth', userController.userAuth);
userRouter.get('/delete/:id', isAuth, isAdmin, userController.delete);
userRouter.get('/add', userController.add);
userRouter.post('/add', userController.addUser);
userRouter.get('/logout', isAuth, userController.logout);

module.exports = userRouter;
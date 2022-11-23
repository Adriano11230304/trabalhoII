const express = require('express');
const { isAuth, isAdmin } = require('../middlewares/middlewares');
const userRouter = express.Router();
const UserController = require('../controllers/userController');
const userController = new UserController;

userRouter.post('/userAuth', userController.userAuth);
userRouter.get('/delete/:id', isAuth, isAdmin, userController.delete);
userRouter.get('/', isAuth, isAdmin, userController.list);
userRouter.get('/login', userController.login);
userRouter.get('/add', userController.add);
userRouter.post('/add', userController.addUser);
userRouter.get('/logout', isAuth, userController.logout);

module.exports = userRouter;
const express = require('express');
const { isAuth, isAdmin } = require('../middlewares/middlewares');
const userRouter = express.Router();
const UserController = require('../controllers/userController');
const userController = new UserController;

userRouter.post('/userAuth', userController.userAuth);
userRouter.get('/', isAuth, isAdmin, userController.list);
userRouter.get('/login', userController.login);
userRouter.get('/add', userController.add);
userRouter.post('/add', userController.addUser);
userRouter.get('/logout', isAuth, userController.logout);
userRouter.delete('/delete', isAuth, isAdmin, userController.delete);
userRouter.get('/deletesuccess', isAuth, isAdmin, userController.deletesuccess);
userRouter.get('/userLogin', userController.userLogin);
userRouter.get('/updateImage/:cpf', isAuth, userController.updateImageForm);
userRouter.get('/:cpf', isAuth, userController.listPostsUser);
userRouter.get('/:cpf/:page', isAuth, userController.listPostsUser);
userRouter.post('/updateImage', isAuth, userController.updateImage);

module.exports = userRouter;
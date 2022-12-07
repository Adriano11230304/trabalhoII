const express = require('express');
const { isAuth, isAdmin, isAuthorPost, isAuthorPostComments } = require('../middlewares/middlewares');

const commentRouter = express.Router();

const CommentController = require('../controllers/commentController');
const commentController = new CommentController;

commentRouter.get('/addComment/:post', isAuth, commentController.addComment);
commentRouter.post('/add', isAuth, commentController.add);
commentRouter.get('/esconder/:id', isAuth, isAuthorPostComments, commentController.esconder);
commentRouter.get('/mostrar/:id', isAuth, isAuthorPostComments, commentController.mostrar);
commentRouter.get('/', commentController.list);

module.exports = commentRouter;
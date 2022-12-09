const express = require('express');
const { isAuth, isAdmin, isAuthorPost } = require('../middlewares/middlewares');

const postRouter = express.Router();

const PostController = require('../controllers/postController');
const postController = new PostController;

postRouter.get('/add-post', isAuth, postController.addPost);
postRouter.get('/details/:id', isAuth, postController.postDetails);
postRouter.get('/details/commentsoff/:id', isAuth, isAuthorPost, postController.postDetailsHidden);
postRouter.get('/', postController.list);
postRouter.get('/:page', postController.list);
postRouter.post('/search', postController.search);
postRouter.post('/', isAuth, postController.add);
postRouter.get('/delete/:id', isAuth, isAuthorPost, postController.remove);
postRouter.get('/update/:id', isAuth, isAuthorPost, postController.updateForm);
postRouter.post('/update', isAuth, isAuthorPost, postController.update);
// postRouter.get('/search/:search', postController.search);
// postRouter.get('/search/', postController.search);
postRouter.get('/like/:id', isAuth, postController.like);


module.exports = postRouter;
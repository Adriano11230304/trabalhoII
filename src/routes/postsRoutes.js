const express = require('express');
const { isAuth } = require('../middlewares/middlewares');

const postRouter = express.Router();

const PostController = require('../controllers/postController');
const postController = new PostController;

/*postRouter.post('/search', postController.search);
postRouter.get('/posts/:id', postController.postDetails);
postRouter.get('/update/:id', postController.updateForm);
postRouter.post('/:id', postController.update);
postRouter.post('/', postController.add);
postRouter.get('/:page', postController.list);*/

postRouter.get('/', postController.list);
postRouter.get('/add-post', isAuth, postController.addPost);
postRouter.post('/', postController.add);
postRouter.get('/delete/:id', postController.remove);
module.exports = postRouter;
const express = require('express');
const { isAuth } = require('../middlewares/isAuth');

const postRouter = express.Router();

const PostController = require('../controllers/postController');
const postController = new PostController;

/*postRouter.post('/search', postController.search);
postRouter.get('/posts/:id', postController.postDetails);
postRouter.get('/add-post', postController.addPost);
postRouter.get('/delete/:id', postController.remove);
postRouter.get('/update/:id', postController.updateForm);
postRouter.post('/:id', postController.update);
postRouter.post('/', postController.add);
postRouter.get('/:page', postController.list);*/

postRouter.get('/', isAuth, postController.list);

module.exports = postRouter;
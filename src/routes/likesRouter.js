const express = require('express');
const { isAuth } = require('../middlewares/middlewares');

const likeRouter = express.Router();

const LikeController = require('../controllers/likeController');
const likeController = new LikeController;

likeRouter.get('/', likeController.list);

module.exports = likeRouter;
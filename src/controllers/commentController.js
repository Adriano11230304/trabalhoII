const { Post } = require("../models/Post")


class CommentController {
    async addComment(req, res) {
        const post = await Post.findOne({
            where: {
                id: req.params.post
            }
        })
        res.render('comments/addComments', { post })
    }
}

module.exports = CommentController;
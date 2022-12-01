const { Post } = require("../models/Post");
const { Comment } = require("../models/Comment");


class CommentController {
    async addComment(req, res) {
        const post = await Post.findOne({
            where: {
                id: req.params.post
            }
        })
        const user = req.session.user;
        res.render('comments/addComments', { post, user })
    }

    async add(req, res){
        const { comments, UserCpf, Postid } = req.body;
        await Comment.create({
            text: comments,
            active: true,
            UserCpf: UserCpf,
            PostId: Postid
        });
        req.session.msg = 'Comentário adicionado!'
        res.redirect('/');
    }

    async list(req, res){
        const commentsAll = await Comment.findAll();

        res.json(commentsAll);
    }
}

module.exports = CommentController;
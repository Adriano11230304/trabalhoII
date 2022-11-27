const { Post } = require('../models/Post');
const { User } = require('../models/User');

class PostController{

    async list(req, res) {
        const posts = await Post.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        });
        console.log(posts);
        const user = req.session.user;
        let msg = req.session.msg;
        req.session.msg = undefined;
        let msgs = req.session.msgs;
        console.log(msgs);
        req.session.msgs = undefined;
        res.render('posts/index', { posts, msg, user, msgs });        
    }

    addPost(req, res){
       const user = req.session.user.cpf;
       res.render('posts/addPost', { user });
    }

    async add(req, res){
        console.log(req.body.user);
        let url = undefined;
        if (req.body.url.includes('jpg') || req.body.url.includes('png') || req.body.url.includes('jpeg')){
            url = req.body.url;
        };
        await Post.create({
            UserCpf: req.session.user.cpf,
            title: req.body.title,
            description: req.body.description,
            imageURL: url
        })
        res.redirect('/posts');
    }

    remove(req, res){
        Post.destroy({
            where:{
                id: req.params.id
            }
        })
        req.session.msg = 'Post excluído com sucesso!';
        res.redirect('/posts');
    }

    async updateForm(req, res){
        console.log(req.params.id);
        const post = await Post.findOne({
            where: {
                id: req.params.id
            }
        });
        
        res.render('posts/updateForm', { post });
    }

    async update(req,res){
        await Post.update({
            title: req.body.title,
            description: req.body.description,
            imageURL: req.body.imageURL
        },{
            where: {
                id: req.body.id
            }
        })
        req.session.msg = 'Post alterado com sucesso!';
        res.redirect('/posts');
    }

    async postDetails(req, res){
        const post = await Post.findOne({
            where: {
                id: req.params.id
            }
        })
        const user = req.session.user;
        const userCreate = await User.findOne({
            where: {
                cpf: post.UserCpf
            }
        })

        res.render('posts/detail', { post, user, userCreate });
    }
    
};



module.exports = PostController;
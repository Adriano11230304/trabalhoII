const { Post } = require('../models/Post');
const { User } = require('../models/User');
const { Comment } = require('../models/Comment');
const { validatePost } = require('./validators');
const { Op } = require("sequelize");
const { Like } = require('../models/Like');
const { dataFormated } = require('./role');

class PostController{

    async list(req, res) {
        let page = 0;
        if(req.params.page){
            page = (req.params.page - 1) * 5
        }
        const posts = await Post.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            limit: 5,
            offset: page
        });

        const totalPosts = await Post.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        })
        const user = req.session.user;
        let msg = req.session.msg;
        req.session.msg = undefined;
        let msgs = req.session.msgs;
        req.session.msgs = undefined;
        const likes = await Like.findAll();
        let liked = 0;
        const usersPosts = [];
        let userPost;
        for(let i = 0; i < posts.length; i++){
            userPost = await User.findOne({
                where: {
                    cpf: posts[i].UserCpf
                }
            })

            usersPosts.push(userPost);
        }

        let image = 0;

        let data = dataFormated(posts);

        res.render('posts/index', { posts, totalPosts, msg, user, msgs, likes, liked, usersPosts, image, data });        
    }

    addPost(req, res){
       const user = req.session.user.cpf;
       res.render('posts/addPost', { user });
    }

    async add(req, res){
        let url = undefined;
        if (req.body.url.includes('jpg') || req.body.url.includes('png') || req.body.url.includes('jpeg')){
            url = req.body.url;
        };
        const { title, description} = req.body;
        const validatePosts = {title, description};
        const errors = validatePost(validatePosts);
        if (errors) {
            const msgs = [];
            errors.details.forEach(error => {
                msgs.push(error.message);
            })
            req.session.msgs = msgs;
            res.redirect('/posts');
        } else {
            await Post.create({
                UserCpf: req.session.user.cpf,
                title: req.body.title,
                description: req.body.description,
                imageURL: url
            })
            res.redirect('/posts');
        }
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
            imageURL: req.body.url
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

        const comments = await Comment.findAll({
            where: {
                PostId: req.params.id,
                active: true
            }
        })
        const usersComments = [];
        let userComment;
        for(let i = 0; i < comments.length; i++){
            userComment = await User.findOne({
                where: {
                    cpf: comments[i].UserCpf
                }
            })
            usersComments.push(userComment);
        }
        
        for (let i = 0; i < usersComments.length; i++) {
            console.log(usersComments[i].nome);
        }
        let msg = req.session.msg;
        req.session.msg = undefined;

        const likes = await Like.findAll();

        let liked = 0;

        let data = dataFormated(post);
        console.log(data);

        res.render('posts/detail', { data, post, user, userCreate, comments, usersComments, msg, likes, liked });
    }

    async postDetailsHidden(req, res){
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

        const comments = await Comment.findAll({
            where: {
                PostId: req.params.id,
                active: false
            }
        })
        const usersComments = [];
        let userComment;
        for(let i = 0; i < comments.length; i++){
            userComment = await User.findOne({
                where: {
                    cpf: comments[i].UserCpf
                }
            })
            usersComments.push(userComment);
        }

        let msg = req.session.msg;
        req.session.msg = undefined;

        let data = dataFormated(post);
        console.log(data);

        res.render('posts/detailHidden', { data, post, user, userCreate, comments, usersComments, msg });
    }

    async search(req, res){
        const posts = await Post.findAll({
            where: {
                [Op.or]:[{
                    title: {
                        [Op.substring] : req.params.search
                    }
                },
                {
                    description:{
                        [Op.substring] : req.params.search
                    }
                }]
            },
            order: [
                ['createdAt', 'DESC']
            ]
        });
        
        res.json(posts);
    }

    async like(req, res){
        const userCpf = req.session.user.cpf;
        const post = await Post.findOne({
            where: {
                id: req.params.id
            }
        })
        const likes = await Like.findAll();
        let liked = 0;
        for(let i = 0; i < likes.length; i++){
            if (likes[i].UserCpf == userCpf && post.id == likes[i].PostId) {
                liked++;
                await Like.destroy({
                    where:{
                        id: likes[i].id
                    }
                })
            }
        }
        if(liked == 0){
            await Like.create({
                UserCpf: userCpf,
                PostId: post.id,
                like: true
            })
        }

        res.redirect('/');
    }
    
};



module.exports = PostController;
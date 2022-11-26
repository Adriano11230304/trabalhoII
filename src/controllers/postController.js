const { Post } = require('../models/Post');

class PostController{

    async list(req, res) {
        const posts = await Post.findAll();
        const user = req.session.user;
        let msg = req.session.msg;
        req.session.msg = undefined;
        let teste = 'teste';
        res.render('posts/index', { posts, msg, user });        
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
            UserCpf: req.body.user,
            title: req.body.title,
            description: req.body.description,
            author: req.body.author,
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
        
    }

    update(req,res){

    }

    async postDetails(req, res){
        
    }
    
};



module.exports = PostController;
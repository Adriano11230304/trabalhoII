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
       
    }

    async add(req, res){
        
    }

    remove(req, res){

    }

    async updateForm(req, res){
        
    }

    update(req,res){

    }

    async postDetails(req, res){
        
    }
    
};



module.exports = PostController;
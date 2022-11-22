const { Post } = require('../models/Post');

class PostController{

    async list(req, res) {
        const posts = await Post.findAll();
        if(req.session.user){
            const user = req.session.user;
            res.render('posts/list', { posts, user });
        }else{
            res.render('posts/list', { posts });
        }
        
        
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
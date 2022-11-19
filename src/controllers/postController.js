const { Post } = require('../models/Post');

class PostController{

    async list(req, res) {
        const posts = await Post.findAll();
        console.log({ posts });
        res.end('tudo certo!');
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
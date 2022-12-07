const { Post } = require("../models/Post");
const { Comment } = require("../models/Comment");

isAuth = (req, res, next) => {
    if (req.session.user){
        next();
    }else{
        let msg = 'Você não está logado!';
        res.render('users/login', { msg });
    }
}

isAdmin = (req, res, next) => {
    if (req.session.user.role == 'admin') {
        next();
    } else {
        req.session.msg = 'Você não tem permissão a essa funcionalidade.';
        res.redirect('/posts');
    }
}

isAuthorPost = async (req, res, next) => {
    let post;
    if(req.params.id){
        post = await Post.findOne({
            where:{
                id: req.params.id
            }
        })
    }else if(req.body.id){
        post = await Post.findOne({
            where:{
                id: req.body.id
            }
        })
    }
    
    if(post.UserCpf == req.session.user.cpf){
        next();
    }else{
        req.session.msg = 'Funcionalidade liberada somente para o criador do Post!';
        res.redirect('/');
    }
}

isAuthorPostComments = async (req, res, next) => {
    let post;
    let comment;
    comment = await Comment.findOne({
        where:{
            id: req.params.id
        }
    })
    post = await Post.findOne({
        where:{
            id: comment.PostId
        }
    })
    
    
    if(post.UserCpf == req.session.user.cpf){
        next();
    }else{
        req.session.msg = 'Funcionalidade liberada somente para o criador do Post!';
        res.redirect('/');
    }
}

module.exports = { isAuth, isAdmin, isAuthorPost };
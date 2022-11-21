const { User } = require('../models/User');
const { Post } = require('../models/Post');

class UserController{
    userAuth(req, res) {
        User.findAll().then(users => {
            users.forEach(async user => {
                if (user.cpf == req.body.cpf && user.password == req.body.password) {
                    req.session.user = user;
                    let msg = 'Você está logado!';
                    const posts = await Post.findAll().then(posts => {
                        return posts;
                    });
                        
                    res.render('posts/list', { msg, posts });
                } else {
                    let msg = 'Usuário ou Senha inválida!';
                    res.render('index', { msg });
                }
            });
        });
        
        
    }

    add(req, res){
        res.render('users/add');
    }

    addPost(req, res){
        res.end('entrou!');
    }
}

module.exports = UserController;
const { User } = require('../models/User');
const { Post } = require('../models/Post');

class UserController{
    async userAuth(req, res) {
        const users = await User.findAll();
        users.forEach(async user => {
            if(user.cpf == req.body.cpf && user.password == req.body.password){
                req.session.user = user;
                let msg = 'Você está logado!';
                const posts = await Post.findAll();
                
                res.render('posts/list', { msg, posts });
            }else{
                let msg = 'Usuário ou Senha inválida!';
                res.render('index', { msg });
            }
        });
    }
}

module.exports = UserController;
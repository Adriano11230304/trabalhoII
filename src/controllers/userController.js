const { User } = require('../models/User');
const { Post } = require('../models/Post');
const { role } = require('./role');

class UserController{
    async userAuth(req, res) {
        const posts = await Post.findAll();
        const users = await User.findAll();
        users.forEach(user => {
            if (user.cpf == req.body.cpf && user.password == req.body.password) {
                req.session.user = user;
                let msg = 'Você está logado!';
                res.render('posts/list', { msg, posts });
            }else{
                let msg = 'Usuário ou Senha inválida!';
                res.render('index', { msg });
            }
        })
           
    }

    add(req, res){
        res.render('users/add');
    }

    async addPost(req, res){
        const user = await User.create({
            cpf: req.body.cpf,
            email: req.body.email,
            nome: req.body.nome,
            password: req.body.password,
            role: role.regular
        });
        console.log({user});
        let msg = 'Usuário cadastrado!';
        
        res.render('index', { msg });
    }
}

module.exports = UserController;
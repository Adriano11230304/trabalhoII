const { User } = require('../models/User');
const { Post } = require('../models/Post');
const { role } = require('./role');

class UserController{
    async userAuth(req, res) {
        const posts = await Post.findAll();
        const users = await User.findAll();
        let userExist = false;
        users.forEach(user => {
            if (user.cpf == req.body.cpf && user.password == req.body.password) {
                req.session.user = user;
                userExist = true;
            }
        })
        if(userExist){
            const user = req.session.user;
            const msg = 'Usuário Logado!';

            res.render('posts/list', { msg, user, posts });
        }else{
            const msg = 'Usuário não está cadastrado!';
            res.render('index', { msg });
        }
    }

    add(req, res){
        res.render('users/add');
    }

    async addUser(req, res){
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

    logout(req, res){
        req.session.user = undefined;
        const msg = 'Você foi deslogado!';
        res.render('index', { msg });
    }
}

module.exports = UserController;
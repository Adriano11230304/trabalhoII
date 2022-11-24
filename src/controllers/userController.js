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

            res.render('posts/index', { msg, user, posts });
        }else{
            const msg = 'CPF ou password inválido!';
            res.render('users/login', { msg });
        }
    }

    add(req, res){
        const user = req.session.user;
        res.render('users/add', { user });
    }

    async addUser(req, res){
        let permissao;
        if(req.body.role){
            if(req.body.role == 'admin'){
                permissao = role.admin;
            }else{
                permissao = role.regular;    
            }
        }else{
            permissao = role.regular;
        }
        await User.create({
            cpf: req.body.cpf,
            email: req.body.email,
            nome: req.body.nome,
            password: req.body.password,
            role: permissao
        });
        req.session.msg = 'Usuário cadastrado!';

        res.redirect('/posts');
        
    }

    logout(req, res){
        req.session.user = undefined;
        const msg = 'Você foi deslogado!';
        res.render('users/login', { msg });
    }

    delete(req, res){
        const cpfs = req.body;
        cpfs.forEach(async cpf => {
            await User.destroy({
                where:{
                    cpf: cpf
                }
            })
        })
        res.end('ok');
    }

    async deletesuccess(req, res){
        const msg = 'Usuários excluídos com sucesso!';
        const users = await User.findAll();
        res.render('users/list', { msg, users });
    }

    async list(req, res){
        const users = await User.findAll();
        
        res.render('users/list', { users });
    }

    login(req, res) {
        req.session.user = undefined;
        res.render('users/login');
    }
}

module.exports = UserController;
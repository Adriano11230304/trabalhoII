const { User } = require('../models/User');
const { Post } = require('../models/Post');
const { role } = require('./role');
const { validate }  = require('./validators');
const { Like } = require('../models/Like');
const formidable = require('formidable');
const fs = require('fs');
const dir = require('../dirname')

class UserController{
    async userAuth(req, res) {
        const posts = await Post.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            limit: 5
        });
        const totalPosts = await Post.findAll();
        const users = await User.findAll();
        const likes = await Like.findAll();
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
            let liked = 0;

            res.render('posts/index', { msg, user, posts, totalPosts, likes, liked });
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
        let nameImage;
        const form = formidable({ multiples: false, uploadDir: 'src/public/img/users' });
        form.parse(req, async (err, fields, files) => {
            if(files.image.originalFilename){
                const image = files.image;
                const path = image.filepath;
                nameImage = '/img/users/' + image.newFilename + '.jpg';
                fs.rename(path, path + '.jpg', err => {
                    if(err){
                        console.log(err);
                    }
                });
            }else{
                const diretorio = files.image.filepath;
                nameImage = null;
                fs.unlink(diretorio, err => {
                    if(err){
                        console.log(err);
                    }
                });
            }
            if (fields.role) {
                if (fields.role == 'admin') {
                    permissao = role.admin;
                } else {
                    permissao = role.regular;
                }
            } else {
                permissao = role.regular;
            }

            const { nome, password, email, cpf } = fields;

            const validateUser = {
                nome, password, email, cpf
            };

            const errors = validate(validateUser);
            if (errors) {
                const msgs = [];
                errors.details.forEach(error => {
                    msgs.push(error.message);
                })
                req.session.msgs = msgs;
                res.redirect('/posts');
            } else {
                await User.create({
                    cpf: cpf,
                    email: email,
                    nome: nome,
                    password: password,
                    role: permissao,
                    Imageurl: nameImage
                });

                req.session.msg = 'Usuário cadastrado!';

                res.redirect('/posts');
            }
        });
        
    }

    logout(req, res){
        req.session.user = undefined;
        const msg = 'Você foi deslogado!';
        res.render('users/login', { msg });
    }

    delete(req, res){
        const cpfs = req.body;
        cpfs.forEach(async cpf => {
            const user = await User.findOne({
                where: {
                    cpf: cpf
                }
            })
            await User.destroy({
                where:{
                    cpf: cpf
                }
            })
            
            if(user.Imageurl){
                const diretorio = dir + '/public' + user.Imageurl;
            
                fs.unlink(diretorio, err => {
                    if(err){
                        console.log(err);
                    }
                })
            }

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
        req.session.msg = undefined;
        res.render('users/login');
    }

    userLogin(req, res){
        if(req.session.user){
            const user = req.session.user;
            res.json(user);
        }else{
            res.json({});
        }
    }

    addImageForm(req, res){
        res.render('users/addImage');
    }

    addImage(req, res){
        const form = formidable({ multiples: false, uploadDir: 'src/public/img/users' });
        form.parse(req, (err, fields, files) => {
            console.log('fields:', fields);
            console.log('files:', files);
        });

        res.json('Ok');
    }
}

module.exports = UserController;
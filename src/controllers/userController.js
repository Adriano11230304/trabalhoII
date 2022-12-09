const { User } = require('../models/User');
const { Post } = require('../models/Post');
const { role, dataFormated } = require('./types');
const { validate }  = require('./validators');
const { Like } = require('../models/Like');
const formidable = require('formidable');
const fs = require('fs');
const dir = require('../dirname');
const bcrypt = require('bcrypt');

class UserController{
    async userAuth(req, res) {
        const users = await User.findAll();
        let userExist = false;
        let passwordCript;
        for(let i = 0; i < users.length; i++){
            passwordCript = await bcrypt.compare(req.body.password, users[i].password);
            let cpfValid = users[i].cpf == req.body.cpf
            if (passwordCript && users[i].cpf == req.body.cpf) {
                req.session.user = users[i];
                userExist = true;
            }
        }
        if(userExist){
            req.session.msg = 'Usuário Logado com sucesso!';
            res.redirect('/posts');
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
                const passwordCript = await bcrypt.hash(password, 10);
                await User.create({
                    cpf: cpf,
                    email: email,
                    nome: nome,
                    password: passwordCript,
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
        const user = req.session.user;
        res.render('users/list', { users, user });
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

    async updateImageForm(req, res){
        res.render('users/addImage');
    }

    async updateImage(req, res){
        const user = req.session.user;

        const form = formidable({ multiples: false, uploadDir: 'src/public/img/users' });
        let nameImage;
        form.parse(req, async (err, fields, files) => {
            if (files.image.originalFilename) {
                if (user.Imageurl){
                    const diretorio = dir + '/public' + user.Imageurl;
                    console.log('imagem antiga:', user.Imageurl);
                    console.log('diretorio:',diretorio);
                    fs.unlink(diretorio, err => {
                        if (err) {
                            console.log(err);
                        }
                    })
                }

                const image = files.image;
                const path = image.filepath;
                nameImage = '/img/users/' + image.newFilename + '.jpg';
                fs.rename(path, path + '.jpg', err => {
                    if (err) {
                        console.log(err);
                    }
                });
                console.log('Nome Imagem nova:', nameImage);

                await User.update({
                    Imageurl: nameImage
                }, {
                    where: {
                        cpf: user.cpf
                    }
                });

                req.session.msg = 'Imagem alterada!';

                res.redirect('/posts');
            } else {
                const diretorio = files.image.filepath;
                nameImage = null;
                fs.unlink(diretorio, err => {
                    if (err) {
                        console.log(err);
                    }
                });

                req.session.msg = 'Imagem no formato errado!';

                res.redirect('/posts');

            }
            
        });
    }

    async listPostsUser(req, res){
        let page = 0;
        if (req.params.page) {
            page = (req.params.page - 1) * 5
        }
        const posts = await Post.findAll({
            where: {
                UserCpf: req.params.cpf
            },
            order: [
                ['createdAt', 'DESC']
            ],
            limit: 5,
            offset: page
        });

        const totalPosts = await Post.findAll({
            where:{
                UserCpf: req.params.cpf
            },
            order: [
                ['createdAt', 'DESC']
            ]
        })
        const user = req.session.user;
        let msg = req.session.msg;
        req.session.msg = undefined;
        let msgs = req.session.msgs;
        req.session.msgs = undefined;
        const likes = await Like.findAll();
        let liked = 0;
        let data = dataFormated(posts);

        res.render('users/listPosts', { posts, totalPosts, msg, user, msgs, likes, liked, data });
    }
}

module.exports = UserController;
const { User } = require('../models/User');

class UserController{
    async userAuth(req, res) {
        const users = await User.findAll();
        users.forEach(user => {
            if(user.cpf == req.body.cpf && user.password == req.body.password){
                req.session.user = user;
                console.log(req.session.user);
                res.end('Usuário logado!');
            }else{
                console.log(req.session.user);
                res.end('Usuário não cadastrado. Você precisa se cadastrar!');
            }
        });
    }
}

module.exports = UserController;
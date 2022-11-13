const { User } = require('../models/User');

class UserController{
    async userAuth(req, res) {
        const users = await User.findAll();
        console.log(users);
        res.end('teste');
    }
}

module.exports = UserController;
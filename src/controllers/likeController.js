const { Like } = require('../models/Like');

class LikeController{
    async list(req, res){
        if(req.session.user){
            const likes = await Like.findAll();
            res.json(likes);
        }else{
            const likes = undefined;
            res.json({});
        }
        
    }
}

module.exports = LikeController;
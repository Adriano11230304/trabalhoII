isAuth = (req, res, next) => {
    if (req.session.user){
        next();
    }else{
        let msg = 'Você não está logado!';
        res.render('index', { msg });
    }
}

module.exports = { isAuth };
isAdmin = (req, res, next) => {
    if (req.session.user.role == 'admin'){
        next();
    }else{
        req.session.msg = 'Você não tem permissão a essa funcionalidade.';
        res.redirect('/posts');
    }
}

module.exports = { isAdmin };
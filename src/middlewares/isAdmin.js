isAdmin = (req, res, next) => {
    if (req.session.user.role == 'admin'){
        console.log(req.session.user.role);
        next();
    }else{
        let msg = 'Você não tem permissão a essa funcionalidade.';
        const user = req.session.user;

        res.redirect('/posts');
    }
}

module.exports = { isAdmin };
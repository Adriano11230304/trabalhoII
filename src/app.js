const express = require('express');
const path = require('path');
const postRouter = require('./routes/postsRoutes');
const userRouter = require('./routes/usersRoutes');
const session = require('express-session');
const dbSync = require('./models/sync');
const commentRouter = require('./routes/commentsRoutes');
const likeRouter = require('./routes/likesRouter');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    secret: 'ssasvdfdbbdfvdvdfv',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/posts', postRouter);
app.use('/users', userRouter);
app.use('/comments', commentRouter);
app.use('/likes', likeRouter);

app.use(express.static('src/public'));

app.get('/', (req, res) => {
    res.redirect('/posts');
});

const server = () => {
    console.log("Servidor rodando na porta 3000!!!");
};

const port = '3000';

app.listen(port, server);
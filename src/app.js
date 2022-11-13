const express = require('express');
const path = require('path');
const postRouter = require('./routes/postsRoutes');
const userRouter = require('./routes/usersRoutes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/posts', postRouter);
app.use('/users', userRouter);

app.use(express.static('src/public'));

const source = (req, res) => {
    res.render('index');
}

app.get('/', source);

const server = () => {
    console.log("Servidor rodando na porta 3000!!!");
};

const port = '3000';

app.listen(port, server);
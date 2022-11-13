DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS comments;

CREATE TABLE users(
    cpf VARCHAR(20) NOT NULL PRIMARY KEY,
    password VARCHAR(20) NOT NULL,
    email VARCHAR(30) NOT NULL,
    nome VARCHAR(30) NOT NULL,
    created_at date NOT NULL
);

CREATE TABLE posts(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(300),
    description VARCHAR(500) NOT NULL,
    author VARCHAR(200),
    user_cpf VARCHAR(20) NOT NULL,
    url VARCHAR(300),
    created_at date NOT NULL,
    FOREIGN KEY(user_cpf) references users(cpf)
);

CREATE TABLE comments(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    text VARCHAR(500) NOT NULL,
    user_cpf VARCHAR(20) NOT NULL,
    posts_id INTEGER NOT NULL,
    FOREIGN KEY(user_cpf) references users(cpf),
    FOREIGN KEY(posts_id) references posts(id)
);
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;



CREATE TABLE users(
    cpf VARCHAR(20) NOT NULL PRIMARY KEY,
    password VARCHAR(20) NOT NULL,
    email VARCHAR(30) NOT NULL,
    nome VARCHAR(30) NOT NULL,
    role VARCHAR(30) NOT NULL,
    createdAt DATE NOT NULL,
    updatedAt DATE
);

CREATE TABLE posts(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(300),
    description VARCHAR(500) NOT NULL,
    author VARCHAR(200),
    user_cpf VARCHAR(20) NOT NULL,
    url VARCHAR(300),
    created_at date NOT NULL,
    updated_at date,
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

insert into users(cpf, password, email, nome, role, createdAt, updatedAt) values('01757947078', '12345', 'adriano.al.pereira@gmail.com', 'Adriano Alvarenga Pereira', 'admin', '2022-01-10 12:00:00', null);

insert into posts(title, description, author, user_cpf, created_at) values('Teste 1', 'ddcds dscdsc sdcsd cdscsdc dscsd', 'Adriano Pereira', '01757947078', '2022-10-06 12:00:00');
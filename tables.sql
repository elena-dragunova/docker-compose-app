CREATE TABLE users (
    id integer PRIMARY KEY,
    name varchar(100) NOT NULL,
    password varchar(100) NOT NULL
);

INSERT INTO users(id, name, password)
VALUES(0, 'user', 'password');
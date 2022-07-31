CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(28) NOT NULL UNIQUE,
    email VARCHAR(28) NOT NULL UNIQUE,
    passhash VARCHAR NOT NULL
);

INSER INTO users (username, email, passhash) VALUES($1, $2);
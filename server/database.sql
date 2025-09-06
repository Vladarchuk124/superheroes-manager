CREATE DATABASE superheroes;

CREATE TABLE heroes (
    id SERIAL PRIMARY KEY,
    nickname VARCHAR(100),
    real_name VARCHAR(150),
    origin_description TEXT,
    superpowers TEXT,
    catch_phrase TEXT,
    images TEXT[]
);